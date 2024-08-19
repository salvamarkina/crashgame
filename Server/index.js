const { Web3 } = require('web3');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const abi = require('./abi');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Allow any origin
        methods: ['GET', 'POST'], // Allow specific methods if needed
        allowedHeaders: ['Authorization'], // Allow specific headers if needed
        credentials: true
    }
});

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);

let players = [];
let currentMultiplier = 1.0;
let gameInProgress = false;
let totalConnections = 0;
let lastCrashValues = []; // Array to store the last 8 crash values
let gameState = 'idle';

io.on('connection', (socket) => {
    totalConnections += 1;
    console.log('New client connected');
    
    io.emit('totalConnections', totalConnections);
    socket.emit('gameState', { state: gameState });
    socket.emit('lastCrashValues', lastCrashValues);

    socket.on('betPlaced', (data) => {
        const { playerAddress, betAmount } = data;

        if (gameInProgress) {
            players.push({ address: playerAddress, betAmount, cashoutMultiplier: null });
            console.log(`Bet placed successfully by ${playerAddress} for ${betAmount / 10e18} BNB.`);
            io.emit('betPlaced', { success: true, playerAddress, betAmount });
        } else {
            console.log('Betting phase is not active.');
            socket.emit('betError', { error: 'Betting phase is not active.' });
        }
    });

    socket.on('cashout', (data) => {
        const { playerAddress } = data;

        // Ensure the game is in progress and hasn't crashed yet
        if (gameState !== 'inProgress') {
            console.log('Cashout failed: Game is not in progress or has already crashed.');
            socket.emit('cashoutError', { error: 'Cashout failed: Game is not in progress or has already crashed.' });
            return;
        }

        // Find the player who is requesting to cash out
        const player = players.find(p => p.address === playerAddress);

        if (gameState === 'inProgress' && player && !player.cashoutMultiplier) {
            player.cashoutMultiplier = Math.round(currentMultiplier * 100);

            socket.emit('cashoutSuccess', { playerAddress, cashoutMultiplier: player.cashoutMultiplier });
            io.emit('playerCashedOut', { playerAddress, cashoutMultiplier: player.cashoutMultiplier });
        } else {
            console.log('Cashout failed or game not in progress.');
            socket.emit('cashoutError', { error: 'Cashout failed or game not in progress.' });
        }
    });

    // Handle incoming chat messages
    socket.on('sendMessage', (message) => {
        // Broadcast the message to all connected clients
        console.log('Message received:', message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        totalConnections -= 1;
        console.log('Client disconnected');
    });
});

function startGameRound() {
    gameInProgress = true;
    players = [];
    currentMultiplier = 1.0;
    gameState = 'betting';
    console.log('Betting phase started. Players can place their bets.');

    io.emit('gameState', { state: gameState });
    io.emit('bettingPhaseStarted');

    let countdown = 30; // 30 seconds countdown for UI

    const countdownInterval = setInterval(() => {
        countdown -= 1;
        io.emit('bettingCountdown', { countdown }); // Emit countdown to the clients

        if (countdown <= 0) {
            clearInterval(countdownInterval); // Stop countdown at 0
        }
    }, 1000); // Countdown updates every second

    setTimeout(() => {
      gameState = 'inProgress';
      console.log('Betting phase ended. Starting multiplier.');
      io.emit('gameState', { state: gameState });
      io.emit('bettingPhaseEnded');

      let crashMultiplier = getCrashMultiplier();

      let randomInt = Math.floor(Math.random() * 10000000000);
      if (randomInt % 33 == 0) {
        crashMultiplier = 1;
    }

    let interval = setInterval(() => {
        currentMultiplier += 0.01 * Math.pow(currentMultiplier, 1.1);

        console.log(`Multiplier: ${currentMultiplier.toFixed(2)}x`);
        io.emit('multiplierUpdate', { multiplier: currentMultiplier.toFixed(2) });

        if (currentMultiplier >= crashMultiplier || currentMultiplier >= 50) {
            console.log(`Game crashed at ${currentMultiplier.toFixed(2)}x`);
            gameInProgress = false;
            clearInterval(interval);

            gameState = 'idle';
            io.emit('gameState', { state: gameState });
            io.emit('crash', { crashMultiplier: currentMultiplier.toFixed(2) });

            lastCrashValues.push(currentMultiplier.toFixed(2));

            // Ensure only the last 8 crash values are kept
            if (lastCrashValues.length > 6) {
                lastCrashValues.shift(); // Remove the oldest value
            }

            // Broadcast the last 8 crash values to all clients
            io.emit('lastCrashValues', lastCrashValues);

            players.forEach(player => {
                if (!player.cashoutMultiplier) {
                    player.cashoutMultiplier = 0;
                }
                console.log(`Player ${player.address} has cashout multiplier: ${player.cashoutMultiplier}`);
            });
            assignDataToContract((currentMultiplier.toFixed(2)) * 100);
        }
      }, 100);
  }, 30000);
}

function getCrashMultiplier() {
  const rand = Math.random();

  if (rand <= 0.045) {
      return getRandomMultiplier(1.00, 1.09);
  } else if (rand <= 0.445) {
      return getRandomMultiplier(1.09, 1.40);
  } 
  else if (rand <= 0.745) {
      return getRandomMultiplier(1.4, 2.2);
  } else if (rand <= 0.895) {
      return getRandomMultiplier(2.2, 4.0);
  } else if (rand <= 0.975) {
      return getRandomMultiplier(4.0, 10.0);
  } else if (rand <= 0.995) {
      return getRandomMultiplier(10.0, 25.0);
  } else {
      return getRandomMultiplier(25.0, 50.0);
  }
}

function getRandomMultiplier(min, max) {
  return Math.random() * (max - min) + min;
}

app.post('/bet', (req, res) => {
    const { playerAddress, betAmount } = req.body;

    if (gameInProgress) {
        players.push({ address: playerAddress, betAmount, cashoutMultiplier: null });
        res.json({ success: true, message: 'Bet placed successfully.' });
    } else {
        res.status(400).json({ error: 'Betting phase is not active.' });
    }
});

async function assignDataToContract(currentMultiplier) {
    let attempts = 0;
    const maxAttempts = 3; // Max number of retries
    let gasIncreaseFactor = 1.2; // 20% gas fee increase for each retry
    let gasAmount = 300000; // Initial gas amount

    while (attempts < maxAttempts) {
        try {
            console.log('Assigning data to smart contract...');
            gameState = 'assigningData';
            io.emit('gameState', { state: gameState });

            const users = [];
            const crashMultipliers = [];

            players.forEach(player => {
                users.push(player.address);
                crashMultipliers.push(player.cashoutMultiplier);
            });

            const tx = await contract.methods.startNewRound(Math.round(currentMultiplier), users, crashMultipliers).send({
                from: account.address,
                gas: gasAmount
            });

            console.log(`Transaction hash: ${tx.transactionHash}`);
            console.log('Data successfully assigned to smart contract.');
            
            // Exit loop and proceed to the next round since the transaction was successful
            break;

        } catch (error) {
            console.error('Error assigning data to smart contract:', error);

            if (error.message.includes('out of gas') || error.message.includes('timeout')) {
                // If the error is related to gas or timeout, retry with more gas
                gasAmount = Math.floor(gasAmount * gasIncreaseFactor);
                console.log(`Retrying with increased gas amount: ${gasAmount}`);
            } else {
                // If it's another kind of error, handle it or break (to avoid infinite loop)
                attempts++;
                if (attempts >= maxAttempts) {
                    console.error('Max attempts reached. Failing the round.');
                    break;
                }
            }
        }
    }

    gameState = 'idle'; // Reset to idle after transaction processing (whether successful or not)
    io.emit('gameState', { state: gameState });

    // Start a new round only if the transaction was successful or after all retries
    if (attempts < maxAttempts) {
        setTimeout(startGameRound, 10000); // Wait 10 seconds before starting the next round
    } else {
        console.log('Transaction failed after maximum attempts, new round will not start.');
    }
}

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startGameRound();
});

/* eslint-disable prettier/prettier */
// import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3';
import { abi } from './abi';

let selectedAccount;
let contract;

export const init = async () => {
    const provider = window.ethereum;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (typeof provider !== 'undefined') {
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`Selected account is ${selectedAccount}`);
            })
            .catch((err) => {
                console.log(err);
            });

        window.ethereum.on('accountsChanged', (accounts) => {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        });
    }

    const web3 = new Web3(provider);
    const web3view = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
    contract = new web3.eth.Contract(abi, '0x360c7bA8bA68704402E7A05E1E2F29577AEbd673');
};

export const getRewards = async () => {
    if (contract && selectedAccount) {
        const rewardAmount = await contract.methods.getRewards().call({ from: selectedAccount });
        return Web3.utils.fromWei(rewardAmount, 'ether'); // Assuming rewards are in wei
    }
    return '0';
};

export const placeBet = async (amount) => {
    if (contract && selectedAccount) {
        await contract.methods.bet().send({
            from: selectedAccount,
            value: Web3.utils.toWei(amount, 'ether'),
            gasPrice: Web3.utils.toWei('5', 'gwei')
        });
    }
};

export const cashout = async () => {
    if (contract && selectedAccount) {
        await contract.methods.cashout().send({ from: selectedAccount });
    }
};

export const getAccount = () => selectedAccount;

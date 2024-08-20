export const abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'player',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'roundId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'BetPlaced',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousAdmin',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newAdmin',
                type: 'address'
            }
        ],
        name: 'CashoutAdminChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'roundId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'crashValue',
                type: 'uint256'
            }
        ],
        name: 'RoundEnded',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'roundId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'crashValue',
                type: 'uint256'
            }
        ],
        name: 'RoundStarted',
        type: 'event'
    },
    {
        inputs: [],
        name: 'bet',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'cashout',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newAdmin',
                type: 'address'
            }
        ],
        name: 'changeCashoutAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'crashValue',
                type: 'uint256'
            },
            {
                internalType: 'address[]',
                name: 'users',
                type: 'address[]'
            },
            {
                internalType: 'uint256[]',
                name: 'amounts',
                type: 'uint256[]'
            }
        ],
        name: 'startNewRound',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_cashoutAdmin',
                type: 'address'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        inputs: [],
        name: 'BETTING_PHASE_DURATION',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'cashoutAdmin',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'currentRoundId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getRewards',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'MAX_BET',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'MIN_BET',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'pendingRewards',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'ROUND_DURATION',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'rounds',
        outputs: [
            {
                internalType: 'uint256',
                name: 'roundId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'crashValue',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'bettingPhaseEndTime',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];

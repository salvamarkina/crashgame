export const contractAbi = [
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
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'balances',
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
        inputs: [],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'player',
                type: 'address'
            }
        ],
        name: 'cashout',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

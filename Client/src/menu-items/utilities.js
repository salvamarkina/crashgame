// assets
import LayersIcon from '@mui/icons-material/Layers';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined';
import { FaBitcoinSign } from 'react-icons/fa6';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Ecosystem',
    type: 'group',
    url: '/',
    children: [
        {
            id: 'dashboard',
            icon: LayersIcon,
            title: `Home`,
            type: 'item',
            url: '/dashboard',
            breadcrumbs: false
        },
        {
            id: 'lease',
            icon: AttachMoneyOutlinedIcon,
            title: `Plinko`,
            type: 'item',
            url: '/lease',
            breadcrumbs: false
        },
        {
            id: 'lendborrow',
            icon: FaBitcoinSign,
            title: `Coin flip`,
            type: 'item',
            url: '/lendborrow',
            breadcrumbs: false
        },
        {
            id: 'analytics',
            icon: MultilineChartOutlinedIcon,
            title: 'Roulette',
            type: 'item',
            url: '/analytics',
            breadcrumbs: false
        }
    ]
};

export default utilities;

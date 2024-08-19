import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Dash from 'views/utilities/Plinko/Dashboard';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/utilities/Plinko/Dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            element: <Dash />
        }
    ]
};

export default MainRoutes;

import { useRoutes } from 'react-router-dom';

// routes
import MainLayout from 'layout/MainLayout';
import CrashGame from 'views/utilities/CrashGame/CrashGame';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <CrashGame />
                }
            ]
        },
        {
            path: '/crash',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <CrashGame />
                }
            ]
        }
    ]);
}

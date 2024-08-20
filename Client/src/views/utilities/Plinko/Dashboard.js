import { useTheme } from '@mui/material/styles';
import DashboardCard from './DashboardCard';

const Dash = () => {
    useTheme();
    return <DashboardCard />;
};

export default Dash;

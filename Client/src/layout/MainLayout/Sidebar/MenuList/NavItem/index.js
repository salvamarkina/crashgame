import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import config from 'config';
import { grey } from '@mui/material/colors';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${config.basename}${item.url}`} target={itemTarget} />)
    };

    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);

        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
    }, [dispatch, item.id]);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: 3,
                '&:hover': { bgcolor: 'transparent' },
                alignItems: 'center',
                bgcolor: 'transparent',
                height: 55,
                width: 'auto',
                mx: 0.3
            }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <Grid item container sx={{ display: 'flex', justifyContent: 'center' }}>
                {item.icon && (
                    <ListItemIcon sx={{ my: 'auto', minWidth: 18 }}>
                        <item.icon />
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        <Typography
                            textAlign="left"
                            variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'body1' : 'body1'}
                            color={grey[50]}
                            sx={{ my: 'auto', ml: 0.5 }}
                        >
                            {item.title}
                        </Typography>
                    }
                />
            </Grid>
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;

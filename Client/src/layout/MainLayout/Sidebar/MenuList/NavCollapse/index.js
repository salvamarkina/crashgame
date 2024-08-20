import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Menu } from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { grey } from '@mui/material/colors';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    // Ref for the anchor element
    const buttonRef = useRef(null);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    // menu collapse & item
    const menus = menu.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <ListItemButton
                ref={buttonRef}
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    bgcolor: 'transparent',
                    alignItems: 'flex-start',
                    pl: `${level * 24}px`
                }}
                selected={selected === menu.id}
                onClick={handleClick}
            >
                {menu.icon && (
                    <ListItemIcon sx={{ my: 'auto', minWidth: 18 }}>
                        <menu.icon />
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        <Typography color={grey[200]} sx={{ mt: 0.5, fontWeight: 500 }}>
                            {menu.title}
                        </Typography>
                    }
                />
                {open ? (
                    <IconChevronUp
                        stroke={1.5}
                        size="1rem"
                        style={{ marginTop: 'auto', color: grey[200], marginBottom: 11, marginLeft: 5 }}
                    />
                ) : (
                    <IconChevronDown
                        stroke={1.5}
                        size="1rem"
                        style={{ marginTop: 'auto', marginBottom: 11, color: grey[200], marginLeft: 5 }}
                    />
                )}
            </ListItemButton>
            <Menu
                id="basic-menu"
                anchorEl={buttonRef.current}
                open={open}
                onClose={handleClick}
                sx={{ marginTop: 1 }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    style: { backgroundColor: theme.palette.card.main, width: '100%', borderRadius: 10 }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                PaperProps={{
                    style: {
                        borderRadius: 10, // This ensures the borderRadius applies to the entire menu
                        backgroundColor: theme.palette.card.main // Apply background color to the whole menu container if needed
                    }
                }}
            >
                <List component="div" disablePadding sx={{ bgcolor: theme.palette.card.main, py: 0 }}>
                    {menus}
                </List>
            </Menu>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number
};

export default NavCollapse;

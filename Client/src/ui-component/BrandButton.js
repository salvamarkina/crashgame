// material-ui
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import PropTypes from 'prop-types';

const BrandButton = ({ text, _width, onClick, startIcon, sx, disabled }) => {
    useTheme();
    // #EB4308
    return (
        <Button
            onClick={() => {
                onClick();
            }}
            startIcon={startIcon}
            disabled={disabled}
            sx={{
                bgcolor: '#f9774b',
                color: grey[50],
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 500,
                width: _width,
                ':hover': { bgcolor: '#EB4308' },
                ':disabled': { background: grey[600], color: grey[50] },
                ...sx
            }}
        >
            {text}
        </Button>
    );
};

BrandButton.propTypes = {
    text: PropTypes.string.isRequired, // assuming text should be a string and is required
    _width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // width can be either string or number
    onClick: PropTypes.func, // onClick should be a function
    startIcon: PropTypes.element, // startIcon should be a React element (e.g., an icon)
    sx: PropTypes.object, // sx should be an object
    disabled: PropTypes.bool
};

export default BrandButton;

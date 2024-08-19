import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import themeReducer from './themeReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    theme: themeReducer
});

export default reducer;

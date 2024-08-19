import ReactDOM from 'react-dom';
// third party
import { BrowserRouter } from 'react-router-dom';
// project imports
import App from 'App';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
// style + assets
import 'assets/scss/style.scss';
import MetamaskProvider from 'components/wallet/MetamaskProvider';
import { store } from 'store';
import { Provider } from 'react-redux';
import Loadable from 'ui-component/Loadable';

// ==============================|| REACT DOM RENDER  ||============================== //

function getLibrary(provider) {
    return new Web3(provider);
}

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
            <BrowserRouter>
                <MetamaskProvider>
                    <>
                        <Loadable />
                        <App />
                    </>
                </MetamaskProvider>
            </BrowserRouter>
        </Provider>
    </Web3ReactProvider>,
    document.getElementById('root')
);

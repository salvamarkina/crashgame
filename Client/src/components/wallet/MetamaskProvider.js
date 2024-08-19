import { useEffect, useState } from 'react';
import { injected } from './connectors';
import { useWeb3React } from '@web3-react/core';
import Loading from 'layout/MainLayout/Loading';

// eslint-disable-next-line react/prop-types
function MetamaskProvider({ children }) {
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        injected
            .isAuthorized()
            .then((isAuthorized) => {
                setLoaded(true);
                if (isAuthorized && !networkActive && !networkError) {
                    console.log('Metamask detected. Please find the connect button on the website.');
                }
            })
            .catch(() => {
                setLoaded(true);
            });
    }, [activateNetwork, networkActive, networkError]);
    if (loaded) {
        return <>{children}</>;
    }
    return (
        <>
            <Loading />
        </>
    );
}

export default MetamaskProvider;

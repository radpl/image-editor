import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};


ReactDOM.render(
    <BrowserRouter>
        <Auth0Provider domain={config.domain} client_id={config.clientId} audience={config.audience} redirect_uri={window.location.origin} onRedirectCallback={onRedirectCallback} >
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </Auth0Provider>
    </BrowserRouter>
    , document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
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
        <Auth0Provider domain={config.domain} client_id={config.clientId} redirect_uri={window.location.origin} onRedirectCallback={onRedirectCallback} >
            <ReduxProvider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <App />
                </DndProvider>
            </ReduxProvider>
        </Auth0Provider>
    </BrowserRouter>
    , document.getElementById('root'));


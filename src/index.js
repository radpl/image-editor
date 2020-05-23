import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(
    <ReduxProvider store={store}>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    </ReduxProvider>, document.getElementById('root'));


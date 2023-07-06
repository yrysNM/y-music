import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from "./App";

import { store } from './redux/store';

import './index.css';


const PreMain = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

export default PreMain;
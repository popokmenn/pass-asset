import './polyfills'
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.scss';
import Main from './DemoPages/Main';

import configureStore from './config/persistedStore';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"

import axios from 'axios'
import { TokenStorage } from "./TokenStorage.ts";

const { persistor, store } = configureStore();
const rootElement = document.getElementById('root');

axios.interceptors.request.use(req => {
    let passAccessToken = localStorage.getItem('passAccessToken')

    if (passAccessToken) {
        req.headers.Authorization = "Bearer " + passAccessToken
    }

    return req

}, error => {
    console.log(error)
    return Promise.reject(error)

})

axios.interceptors.response.use(res => {
    console.log(res.data)
    return res
}, error => {
    console.log(error)

    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error); // Return any error which is not due to authentication back to the calling service
        });
    }

    return TokenStorage.getNewToken() // Try request again with new token
        .then((token) => { // New request with new token
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${token}`;

            return new Promise((resolve, reject) => {
                axios.request(config).then(response => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            });

        })
        .catch((error) => {
            Promise.reject(error);
        });
})

const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Component />
                </HashRouter>
            </PersistGate>
        </Provider>,
        rootElement
    );
};

renderApp(Main);

if (module.hot) {
    module.hot.accept('./DemoPages/Main', () => {
        const NextApp = require('./DemoPages/Main').default;
        renderApp(NextApp);
    });
}
serviceWorker.unregister();


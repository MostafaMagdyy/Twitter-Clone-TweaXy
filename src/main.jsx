import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider clientId="150598822682-k32n8uknhd9o6vqdnr045qic68103ou1.apps.googleusercontent.com">
                    <App />
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

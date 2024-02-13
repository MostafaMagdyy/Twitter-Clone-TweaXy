import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyDLeHnHS0p0SHhp9XblU0VUTMGDHTMpmFE',
    authDomain: 'push-nofitication-test-f51f4.firebaseapp.com',
    projectId: 'push-nofitication-test-f51f4',
    storageBucket: 'push-nofitication-test-f51f4.appspot.com',
    messagingSenderId: '128761461591',
    appId: '1:128761461591:web:311797fe5c0c9f7a749c12',
    measurementId: 'G-R80VJLVP9X',
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async () => {
    return getToken(messaging, {
        vapidKey:
            'BHfmxZCCwrB_aPQaSPqGtxm10G6C949A1ybeWYD7-lx3PZTwySekvacseuIHcKRzwQkog44ETUse0ui2EXw7cgk',
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                return currentToken;
            } else {
                console.log(
                    'No registration token available. Request permission to generate one.'
                );
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () => {
    console.log('onMessageListener');
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('payload', payload);
            resolve(payload);
        });
    });
};

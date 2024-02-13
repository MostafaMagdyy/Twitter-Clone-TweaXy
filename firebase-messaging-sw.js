// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDLeHnHS0p0SHhp9XblU0VUTMGDHTMpmFE",
  authDomain: "push-nofitication-test-f51f4.firebaseapp.com",
  projectId: "push-nofitication-test-f51f4",
  storageBucket: "push-nofitication-test-f51f4.appspot.com",
  messagingSenderId: "128761461591",
  appId: "1:128761461591:web:311797fe5c0c9f7a749c12",
  measurementId: "G-R80VJLVP9X"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

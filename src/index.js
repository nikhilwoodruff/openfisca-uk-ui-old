import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBfrh4iVG3HJGS6UZToeA8Vct3uSjLi4kE",
  authDomain: "openfisca-uk-ui.firebaseapp.com",
  projectId: "openfisca-uk-ui",
  storageBucket: "openfisca-uk-ui.appspot.com",
  messagingSenderId: "809049110771",
  appId: "1:809049110771:web:f938d29aa98fbebfe85f86",
  measurementId: "G-DWRJCHKKPH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

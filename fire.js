import firebase from 'firebase';
import env from './env';

// Initialize Firebase
const config = {
    apiKey: env.REACT_APP_apiKey,
    authDomain: env.REACT_APP_authDomain,
    databaseURL: env.REACT_APP_databaseURL,
    projectId: env.REACT_APP_projectId,
    storageBucket: env.REACT_APP_storageBucket,
    messagingSenderId: env.messagingSenderId,
};
// commits to dev should not be reflected
// in github commit graph
const fire = !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();

export default fire;

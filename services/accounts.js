import fire from '../fire';

// Function that creates an account via firebase auth
const create = async (email, password) => {
    if (!email || !password) {
        throw `No username or password was given!`;
    }
    console.log('hey hey hey');

    return fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(success => success.user.uid)
        .catch(err => {
            throw err;
        });
};

const signIn = async (email, password) => {
    if (!email || !password) {
        throw `No username or password was given!`;
    }

    return fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(success => success)
        .catch(err => {
            throw err;
        });
};

const getCurrentUser = () => {
    return fire.auth().currentUser;
};

const signOut = () => {
    return fire.auth().signOut();
};

export { create, signIn, signOut, getCurrentUser};

import fire from '../fire';

// Function that creates an account via firebase auth
const create = async (username, password) => {
    if (!username || !password) {
        throw `No username or password was given!`;
    }

    return fire
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(success => success.user.uid)
        .catch(err => {
            throw err;
        });
};

export { create };

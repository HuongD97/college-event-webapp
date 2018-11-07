import React, { Component } from 'react';
import fire from '../fire';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
        };
    }

    componentDidMount() {
        fire.auth()
            .signInWithEmailAndPassword('d', '12345678')
            .then(() => {
                const user = fire.auth().currentUser;
                this.setState({ userID: user ? user.uid : null });
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error);
            });
    }

    render() {
        if (this.state.userID) {
            return (
                <div>{`user ${this.state.userID} is currently logged in!`}</div>
            );
        } else {
            return <div>{`No user is currently logged in.`}</div>;
        }
    }
}

export default Login;

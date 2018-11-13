import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { getCurrentUser } from '../services/accounts';

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        const { firstName, lastName, email, uid } = props.router.query.user;
        this.state = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            uid: uid,
        };
    }

    componentDidMount() {
        getCurrentUser()
            .then(uid => this.setState({ uid: uid}))
            .catch(err => console.log('ERRROr', err));
    }

    render() {
        return <div>Welcome {this.state.firstName}!</div>;
    }
}

export default withRouter(LoggedIn);

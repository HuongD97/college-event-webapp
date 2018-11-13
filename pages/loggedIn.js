import React, { Component } from 'react';
import { withRouter } from 'next/router';

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        const { firstName, lastName, email, uid } = props.router.query.user;
        this.state = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            uid: uid
        }
    }

    render() {
        return <div>Welcome {this.state.firstName}!</div>;
    }
}

export default withRouter(LoggedIn);

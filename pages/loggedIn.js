import React, { Component } from 'react';
import { withRouter } from 'next/router';

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        console.log(`props ${JSON.stringify(props)}`);
        this.state = {
            firstName: props.router.query.user.firstName,
            lastName: props.router.query.user.lastName,
            email: props.router.query.user.email,
            uid: props.router.query.user.uid,
        }
    }

    render() {
        return <div>Welcome {this.state.firstName}!</div>;
    }
}

export default withRouter(LoggedIn);

import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { getCurrentUser } from '../services/accounts';
import ButtonAppBar from '../components/ButtonAppBar';

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        const { firstName, lastName, email, uid, role} =
            props.router.query.user || {};
        this.state = {
            firstName: firstName || 'Huong',
            lastName: lastName || 'Dang',
            email: email || 'huongd97@gmail.com',
            uid: uid || '12345678',
            role: role || 'student',
        };
    }

    componentDidMount() {
        getCurrentUser()
            .then(uid => this.setState({ uid: uid }))
            .catch(err => console.log('Error', err));
    }

    render() {
        return (
            <div>
                <ButtonAppBar
                    name={this.state.firstName}
                    role={this.state.role}
                />
            </div>
        );
    }
}

export default withRouter(LoggedIn);

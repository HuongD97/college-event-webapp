import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import axios from 'axios';
import pick from 'lodash/pick';
import assign from 'lodash/assign';
import keys from 'lodash/keys';
import Intro from '../components/Intro';
import Break from '../components/Break';
import { signOut } from '../services/accounts';
import CreateRSOs from '../components/CreateRSOs';
import RSOs from '../components/RSOs';

const ROLE_OPTIONS = {
    student: 'student',
    admin: 'admin',
    superadmin: 'superadmin',
};
const styles = {
    root: {
        flexGrow: 1,
    },
};

const TAB_OPTIONS = {
    create_rso: 'create_rso',
    join_rso: 'join_rso',
    create_event: 'create_event',
    show_events: 'show_events',
    show_account: 'show_account',
};

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        const { uid } = props.router.query;

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            university: '',
            uid: uid,
            role: '',
            errorMessage: '',
            currentTab: TAB_OPTIONS.show_account,
            showAccountInfo: true,
        };
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/user', {
                uid: this.state.uid,
            });
            this.setState(
                assign(
                    {},
                    this.state,
                    pick(result.data.user || {}, keys(this.state)),
                ),
            );
        } catch (e) {
            console.log('Error getting user data from database.', e);
        }
    }

    handleSignOut = async () => {
        try {
            await signOut();
            Router.push('/');
        } catch (e) {
            console.log('Error signing out.', e);
        }
    };

    switch = tabName => event => {
        this.setState({ currentTab: tabName });
    };

    renderAppBar = () => {
        const { role } = this.state;
        const createEvent =
            role === ROLE_OPTIONS.superadmin || role === ROLE_OPTIONS.admin;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={this.switch(TAB_OPTIONS.create_rso)}
                    >
                        Create RSO
                    </Button>
                    <Button
                        color="inherit"
                        onClick={this.switch(TAB_OPTIONS.join_rso)}
                    >
                        Join RSOs
                    </Button>
                    <Button
                        color="inherit"
                        onClick={this.switch(TAB_OPTIONS.show_events)}
                    >
                        Events
                    </Button>
                    {createEvent ? (
                        <Button
                            color="inherit"
                            onClick={this.switch(TAB_OPTIONS.create_event)}
                        >
                            Create Event
                        </Button>
                    ) : null}
                    <Button
                        color="inherit"
                        onClick={this.switch(TAB_OPTIONS.show_account)}
                    >
                        Account
                    </Button>
                    <Button color="inherit" onClick={this.handleSignOut}>
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
        );
    };

    renderTab = () => {
        const user = assign({}, pick(this.state, ['firstName', 'lastName', 'university', 'role', 'email', 'uid']));
        switch (this.state.currentTab) {
            case TAB_OPTIONS.create_rso:
                return <CreateRSOs user={user}/>;
            case TAB_OPTIONS.join_rso:
                return <RSOs user={user} />;
            case TAB_OPTIONS.show_events:
                return <div>Show events here!</div>;
            case TAB_OPTIONS.create_event:
                return <div>Create an event here!</div>;
            case TAB_OPTIONS.show_account:
                return (
                    <div style={{ margin: '0px', padding: '0px' }}>
                        <Intro user={this.state} />
                        <Break height={15} />
                    </div>
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <div style={styles.root}>
                {this.renderAppBar()}
                <Break height={15} />
                {this.renderTab()}
                <Break height={15} />
            </div>
        );
    }
}

export default withRouter(LoggedIn);

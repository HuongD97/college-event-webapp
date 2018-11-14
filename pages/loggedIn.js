import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import ButtonAppBar from '../components/ButtonAppBar';
import { Card, CardContent, AppBar, Toolbar, Button } from '@material-ui/core';
import ErrorMessage from '../components/Error';
import axios from 'axios';
import { assign, pick, keys } from 'lodash';
import Intro from '../components/Intro';
import Break from '../components/Break';
import { signOut } from '../services/accounts';

const styles = {
    root: {
        flexGrow: 1,
    },
};

const tabs = [];
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

    renderAccountInfo = () => {
        if (!this.state.showAccountInfo) {
            return null;
        }

        return (
            <div style={{ margin: '0px', padding: '0px' }}>
                <Intro user={this.state} />
                <Break height={15} />
            </div>
        );
    };

    toggleAccountInfo = () => {
        this.setState({
            showAccountInfo: !this.state.showAccountInfo,
        });
    };

    render() {
        return (
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit">Create RSO</Button>
                        <Button color="inherit">Join RSOs</Button>
                        <Button color="inherit">Events</Button>
                        <Button color="inherit">Create Event</Button>
                        <Button
                            color="inherit"
                            onClick={this.toggleAccountInfo}
                        >
                            Account
                        </Button>
                        <Button color="inherit" onClick={this.handleSignOut}>
                            Sign Out
                        </Button>
                    </Toolbar>
                </AppBar>
                <Break height={15} />
                {this.renderAccountInfo()}
                <Break height={15} />
            </div>
        );
    }
}

export default withRouter(LoggedIn);

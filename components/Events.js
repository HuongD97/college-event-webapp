import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PublicEvents from './PublicEvents';
import Break from './Break';
import PrivateEvents from './PrivateEvents';
import RSOEvents from './RSOEvents';
import axios from 'axios';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            userComments: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.post('/userComments', {
                uid: this.state.user.uid,
            });
            this.setState({ userComments: res.data.userComments });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const { userComments } = this.state;
        return (
            <div>
                <PublicEvents user={this.state.user} userComments={userComments} />
                <Break height={15} />
                <PrivateEvents user={this.state.user} userComments={userComments}/>
                <Break height={15} />
                <RSOEvents user={this.state.user} userComments={userComments}/>
            </div>
        );
    }
}

Events.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Events;

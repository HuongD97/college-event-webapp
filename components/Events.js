import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PublicEvents from './PublicEvents';
import Break from './Break';
import PrivateEvents from './PrivateEvents';
import RSOEvents from './RSOEvents';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        };
    }

    render() {
        return (
            <div>
                <PublicEvents user={this.state.user} />
                <Break height={15} />
                <PrivateEvents user={this.state.user} />
                <Break height={15} />
                <RSOEvents user={this.state.user} />
            </div>
        );
    }
}

Events.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Events;

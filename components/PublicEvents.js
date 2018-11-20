import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import axios from 'axios';
import filter from 'lodash/filter';
import Event from './Event';

class PublicEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            publicEvents: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/publicEvents');

            // Only show events that have been approved
            const approvedPublicEvents = filter(
                res.data.publicEvents,
                event => event.approved === 1,
            );
            this.setState({ publicEvents: approvedPublicEvents });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title={'Public Events'} />
                {this.state.publicEvents.map(publicEvent => (
                    <Event
                        key={publicEvent.public_event_id}
                        eventInfo={publicEvent}
                        user={this.state.user}
                    />
                ))}
            </Card>
        );
    }
}

PublicEvents.propTypes = {
    user: PropTypes.object.isRequired,
};

export default PublicEvents;

import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button,
    CircularProgress,
} from '@material-ui/core';
import Break from './Break';
import axios from 'axios';
import filter from 'lodash/filter';
import moment from 'moment';

const formatDateAndTime = timestamp => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};

const Event = props => {
    const {
        event_name,
        event_location,
        event_time,
        event_description,
        event_id,
        admin_id,
        admin_email,
        event_comment,
    } = props.eventInfo;

    return (
        <Card>
            <CardContent>
                <Typography component="p">
                    Name: <b>{event_name}</b>
                </Typography>
                <Typography component="p">
                    Location: <b>{event_location}</b>
                </Typography>
                <Typography component="p">
                    Time: <b>{event_time}</b>
                </Typography>
                <Typography component="p">
                    Description: <b>{event_description}</b>
                </Typography>
                <Typography component="p">
                    Contact name: <b>{admin_id}</b>
                </Typography>
                <Typography component="p">
                    Contact email: <b>{admin_email}</b>
                </Typography>
                <Typography component="p">
                    Comment: <b>{event_comment}</b>
                </Typography>
                <Break height={15} />
            </CardContent>
        </Card>
    );
};

Event.propTypes = {
    eventInfo: PropTypes.object.isRequired,
};

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

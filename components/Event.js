import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import Break from './Break';
import moment from 'moment';

const formatDateAndTime = timestamp => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};

const Event = props => {
    const {
        event_name,
        event_time,
        event_description,
        event_comment,
        location_name,
        university,
        firstName,
        lastName,
        email,
    } = props.eventInfo;
    return (
        <Card>
            <CardContent>
                <Typography component="p">
                    Name: <b>{event_name}</b>
                </Typography>
                <Typography component="p">
                    Location: <b>{`${location_name} at ${university}`}</b>
                </Typography>
                <Typography component="p">
                    Time: <b>{formatDateAndTime(event_time)}</b>
                </Typography>
                <Typography component="p">
                    Description: <b>{event_description}</b>
                </Typography>
                <Typography component="p">
                    Contact name: <b>{`${firstName} ${lastName}`}</b>
                </Typography>
                <Typography component="p">
                    Contact email: <b>{`${email}`}</b>
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

export default Event;

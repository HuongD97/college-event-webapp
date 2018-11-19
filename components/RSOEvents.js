import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from '@material-ui/core';
import axios from 'axios';
import Event from './Event';

class RSOEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            rsoEvents: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.post('/rsoEvents', {
                uid: this.state.user.uid,
            });
            this.setState({ rsoEvents: res.data.rsoEvents });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title={'RSO Events'} />
                {this.state.rsoEvents.map(rsoEvent => (
                    <Event
                        key={rsoEvent.rso_event_id}
                        eventInfo={rsoEvent}
                        userComments={this.props.userComments}
                    />
                ))}
            </Card>
        );
    }
}

RSOEvents.propTypes = {
    user: PropTypes.object.isRequired,
    userComments: PropTypes.object.isRequired,
};

export default RSOEvents;

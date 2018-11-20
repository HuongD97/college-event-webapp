import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from '@material-ui/core';
import axios from 'axios';
import Event from './Event';

class PrivateEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            privateEvents: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.post('/privateEvents', {
                university: this.state.user.university,
            });

            this.setState({ privateEvents: res.data.privateEvents });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title={'Private Events'} />
                {this.state.privateEvents.map(privateEvent => (
                    <Event
                        key={privateEvent.private_event_id}
                        eventInfo={privateEvent}
                        user={this.state.user}
                    />
                ))}
            </Card>
        );
    }
}

PrivateEvents.propTypes = {
    user: PropTypes.object.isRequired,
};

export default PrivateEvents;

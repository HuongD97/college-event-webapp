import React, { Component } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Break from './Break';
import axios from 'axios';
import each from 'lodash/each';
import find from 'lodash/find';

class RSOs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rsos: [],
        };
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/universityRSOs', {
                university: this.props.user.university,
            });
            this.setState({ rsos: result.data.allRSOs });

            each(result.data.allRSOs, async rso => {
                const admin = await axios.post('/user', { uid: rso.admin_id });
                let modifiedRSO = this.state.rsos;
                let theRSO = find(modifiedRSO, { admin_id: rso.admin_id });
                theRSO.admin_name =
                    admin.data.user.firstName + admin.data.user.lastName;
                theRSO.admin_email = admin.data.user.email;

                this.setState({ rsos: modifiedRSO });
            });
        } catch (e) {
            console.error(e);
        }
    }

    handleJoin = event => {};

    renderRSOs = () => {
        if (!this.state.rsos) return null;

        const listItems = this.state.rsos.map(rso => {
            return (
                <Card key={rso.rso_id}>
                    <CardContent>
                        <Typography component="p">
                            Name: <b>{rso.rso_name}</b>
                        </Typography>
                        <Typography component="p">
                            Description: <b>{rso.description}</b>
                        </Typography>
                        <Typography component="p">
                            Admin name: <b>{rso.admin_name}</b>
                        </Typography>
                        <Typography component="p">
                            Admin email: <b>{rso.admin_email}</b>
                        </Typography>
                        <Break height={15} />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.handleJoin}
                        >
                            Join
                        </Button>
                    </CardContent>
                </Card>
            );
        });
        return listItems;
    };

    render() {
        console.log('this.state', this.state);
        return (
            <Card>
                <CardHeader title={'Registered Student Organizations'} />
                {this.renderRSOs()}
            </Card>
        );
    }
}

RSOs.propTypes = {
    user: PropTypes.object.isRequired,
};

export default RSOs;

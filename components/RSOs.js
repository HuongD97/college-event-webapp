import React, { Component, useState } from 'react';
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
import filter from 'lodash/filter';
import async from 'async';
import each from 'lodash/each';
import assign from 'lodash/assign';
import RSO from './RSO';

class RSOs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rsos: [],
            errorMessage: '',
            user: props.user,
        };
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/universityRSOs', {
                university: this.state.user.university,
            });
            const userResults = await axios.post('/userRSOs', {
                uid: this.state.user.uid,
            });

            let allRSOs = result.data.allRSOs;
            let userRSOs = userResults.data.userRSOs.map(
                userRSO => userRSO.rso_id,
            );
            async.each(
                allRSOs,
                async (rso, next) => {
                    try {
                        const admin = await axios.post('/user', {
                            uid: rso.admin_id,
                        });

                        // Figure out if the user has joined the RSO or not
                        if (
                            userRSOs.findIndex(
                                userRSO => userRSO === rso.rso_id,
                            ) > -1
                        ) {
                            rso.joined = true;
                        } else {
                            rso.joined = false;
                        }

                        let RSOs = filter(allRSOs, { admin_id: rso.admin_id });
                        each(RSOs, thisRSO => {
                            thisRSO.admin_name =
                                admin.data.user.firstName +
                                ' ' +
                                admin.data.user.lastName;
                            thisRSO.admin_email = admin.data.user.email;
                        });
                        next();
                    } catch (e) {
                        if (e) next(e);
                    }
                },
                err => {
                    if (err) throw err;
                    else {
                        this.setState({ rsos: allRSOs });
                    }
                },
            );
        } catch (e) {
            this.setState({
                errorMessage: 'Could not retrieve RSOs',
            });
            console.error(e);
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title={'Registered Student Organizations'} />
                {this.state.rsos.map(thisRSO => (
                    <RSO
                        key={thisRSO.rso_id}
                        rsoInfo={thisRSO}
                        uid={this.state.user.uid}
                    />
                ))}
            </Card>
        );
    }
}

RSOs.propTypes = {
    user: PropTypes.object.isRequired,
};

export default RSOs;

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

const Rso = props => {
    let {
        rso_id,
        rso_name,
        description,
        admin_name,
        admin_email,
        joined,
    } = props.rsoInfo;

    console.log('props.rsoInfo', props.rsoInfo);
    // functional component let's try it out!!
    const [join, setJoin] = useState(joined);
    const handleJoin = () => {
        setJoin(!join);
    };

    const JoinedButton = () => {
        return (
            <Button variant="outlined" color="secondary" disabled={true}>
                Joined
            </Button>
        );
    };

    const JoinButton = () => {
        return (
            <Button variant="outlined" color="primary" onClick={handleJoin}>
                Join
            </Button>
        );
    };

    return (
        <Card>
            <CardContent>
                <Typography component="p">
                    Name: <b>{rso_name}</b>
                </Typography>
                <Typography component="p">
                    Description: <b>{description}</b>
                </Typography>
                <Typography component="p">
                    Admin name: <b>{admin_name}</b>
                </Typography>
                <Typography component="p">
                    Admin email: <b>{admin_email}</b>
                </Typography>
                <Break height={15} />
                {join ? <JoinButton /> : <JoinedButton />}
            </CardContent>
        </Card>
    );
};

class RSOs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rsos: [],
            errorMessage: '',
        };
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/universityRSOs', {
                university: this.props.user.university,
            });

            let allRSOs = result.data.allRSOs;

            async.each(
                allRSOs,
                async (rso, next) => {
                    try {
                        const admin = await axios.post('/user', {
                            uid: rso.admin_id,
                        });

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
        return (
            <Card>
                <CardHeader title={'Registered Student Organizations'} />
                {this.state.rsos.map(thisRSO => (
                    <Rso
                        key={thisRSO.rso_id}
                        rsoInfo={assign({}, thisRSO, { joined: true })}
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

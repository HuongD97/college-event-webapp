import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Break from './Break';
import axios from 'axios';

const RSO = props => {
    let {
        rso_id,
        rso_name,
        description,
        admin_name,
        admin_email,
        joined,
    } = props.rsoInfo;

    const [join, setJoin] = useState(joined);
    const [loading, setLoading] = useState(false);

    const handleJoin = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/joinRSO', {
                uid: props.uid,
                rso_id: rso_id,
            });

            setJoin(res.data.joined);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
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

    const LoadingButton = () => {
        return (
            <Button variant="outlined" disabled={true}>
                <CircularProgress size={25} />
            </Button>
        );
    };

    const renderButton = () => {
        if (loading) {
            return <LoadingButton />;
        } else {
            return !join ? <JoinButton /> : <JoinedButton />;
        }
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
                {renderButton()}
            </CardContent>
        </Card>
    );
};

RSO.propTypes = {
    rsoInfo: PropTypes.object.isRequired,
};

export default RSO;

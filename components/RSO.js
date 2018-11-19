import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Break from './Break';

const RSO = props => {
    let {
        rso_id,
        rso_name,
        description,
        admin_name,
        admin_email,
        joined,
    } = props.rsoInfo;

    console.log('props.rsoInfo', props.rsoInfo);

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
                {!join ? <JoinButton /> : <JoinedButton />}
            </CardContent>
        </Card>
    );
};

RSO.propTypes = {
    rsoInfo: PropTypes.object.isRequired,
};

export default RSO;

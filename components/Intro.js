import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Intro = props => {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Account Information
                </Typography>
                <Typography component="p">
                    First name: <b>{props.user.firstName}</b>
                </Typography>
                <Typography component="p">
                    Last name: <b>{props.user.lastName}</b>
                </Typography>
                <Typography component="p">Email: <b>{props.user.email}</b></Typography>
                <Typography component="p">Role: <b>{props.user.role}</b></Typography>
                <Typography component="p">
                    University: <b>{props.user.university}</b>
                </Typography>
            </CardContent>
        </Card>
    );
};

Intro.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Intro;

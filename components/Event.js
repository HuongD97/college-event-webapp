import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from '@material-ui/core';
import Break from './Break';
import moment from 'moment';
import axios from 'axios/index';
// import classNames from 'classnames';

const formatDateAndTime = timestamp => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};
const styles = {
    textField: {
        flexBasis: 100,
    },
};
const Comment = props => {
    const { event_id } = props.eventInfo;
    const { uid } = props.user;

    const [loading, setLoading] = useState(false);
    const [commentAndRating, setCommentAndRating] = useState({
        comment: '',
        rating: -1,
    });
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Asynchronous function to update user's comment
    const getUserCommentAndRatingForEvent = async () => {
        try {
            const res = await axios.post('/userComment', {
                uid,
                event_id,
            });

            return res.data.userComment[0];
        } catch (e) {
            console.error(e);
        }
    };

    // Fetch the user's comment and update state
    useEffect(() => {
        getUserCommentAndRatingForEvent().then(userFeedback => {
            const { content, rating } = userFeedback || {
                content: '',
                rating: -1,
            };
            setCommentAndRating({ comment: content, rating: rating });
            setComment(content);
            setRating(rating);
        });
    }, []);

    const Edit = () => {
        return (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditing(true)}
            >
                Edit
            </Button>
        );
    };

    const Save = () => {
        return (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => console.log('saving')}
            >
                Save
            </Button>
        );
    };

    const Delete = () => {
        return (
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => console.log('deleting')}
                disabled={saving}
            >
                Delete
            </Button>
        );
    };

    const Cancel = () => {
        return (
            <Button
                variant="outlined"
                onClick={() => setEditing(false)}
                disabled={saving}
            >
                Cancel
            </Button>
        );
    };

    const getRating = rating => {
        return rating > -1 ? `${rating} / 5` : 'Not Rated';
    };

    const getComment = comment => {
        return comment.length > 0 ? `${comment}` : 'No comment yet';
    };

    const renderEditView = () => {
        const handleChange = name => event => {
            switch (name) {
                case 'comment':
                    setComment(event.target.value);
                    break;
                case 'rating':
                    setRating(event.target.value);
                    break;
            }
        };
        return (
            <div
                style={{
                    borderStyle: 'solid',
                    borderWidth: '0.5px',
                    padding: '20px',
                    borderRadius: '20px',
                }}
            >
                <FormControl>
                    <InputLabel htmlFor="rating">Rating</InputLabel>
                    <Select value={rating} onChange={handleChange('rating')}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <Break height={15} />
                <TextField
                    label="Comment"
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleChange('comment')}
                    multiline={true}
                    rowsMax={4}
                    fullWidth
                />
                <Break height={15} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Save />
                    <div style={{ marginRight: '5px' }} />
                    <Delete />
                    <div style={{ marginRight: '5px' }} />
                    <Cancel />
                </div>
            </div>
        );
    };

    const renderView = () => {
        return (
            <div
                style={{
                    borderStyle: 'solid',
                    borderWidth: '0.5px',
                    padding: '20px',
                    borderRadius: '20px',
                }}
            >
                <Typography component="p">
                    Rating: <b>{getRating(commentAndRating.rating)}</b>
                </Typography>
                <Typography component="p">
                    Comment: <b>{getComment(commentAndRating.comment)}</b>
                </Typography>
                <Break height={15} />
                <Edit />
            </div>
        );
    };

    return editing ? renderEditView() : renderView();
};

const Event = props => {
    const {
        event_name,
        event_time,
        event_description,
        location_name,
        university,
        firstName,
        lastName,
        email,
        rso_name,
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
                {rso_name ? (
                    <Typography component="p">
                        RSO: <b>{rso_name}</b>
                    </Typography>
                ) : null}
                <Typography component="p">
                    Contact name: <b>{`${firstName} ${lastName}`}</b>
                </Typography>
                <Typography component="p">
                    Contact email: <b>{`${email}`}</b>
                </Typography>
                <Break height={15} />
                <Comment user={props.user} eventInfo={props.eventInfo} />
                <Break height={15} />
            </CardContent>
        </Card>
    );
};

Event.propTypes = {
    eventInfo: PropTypes.object.isRequired,
};

export default Event;

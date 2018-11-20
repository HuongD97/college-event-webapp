import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormContainer from './FormContainer';
import classNames from 'classnames';
import ErrorMessage from './Error';
import assign from 'lodash/assign';
import Break from './Break';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import map from 'lodash/map';
import SuccessMessage from './Success';

const styles = theme => ({
    textField: {
        flexBasis: 100,
    },
});

const EVENT_TYPES = ['public', 'private', 'rso'];

class CreateEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            form: {
                event_name: '',
                event_description: '',
                event_location_id: '',
                event_type: '',
                admin_id: '',
                rso_id: '',
                approved: true,
                event_time: '2018-11-20T20:00',
            },
            rsoChoices: [],
            locationChoices: [],
            errorMessage: '',
            successMessage: '',
            loading: false,
        };
    }

    async componentDidMount() {
        try {
            // Grab location
            const res = await axios.post('/adminRSOs', {
                uid: this.props.user.uid,
            });

            const locations = await axios.get('/getAllLocations');
            this.setState({
                user: this.props.user,
                form: assign({}, this.state.form, {
                    admin_id: this.props.user.uid,
                }),
                rsoChoices: res.data.adminRSOs,
                locationChoices: locations.data.allLocations,
            });
        } catch (e) {
            console.error(e);
        }
    }

    handleChange = prop => event => {
        const modifiedForm = assign({}, this.state.form, {
            [prop]: event.target.value,
        });
        this.setState({ form: modifiedForm });
    };

    validateForm = () => {
        const errorMessage = `Please fill out all fields of the form. You must pick an RSO if the event is an RSO.`;
        const validation = map(
            this.state.form,
            property => property.length > 0,
        );

        if (validation.includes(false)) {
            this.setState({ errorMessage: errorMessage });
            return false;
        }

        this.setState({ errorMessage: '' });
        return true;
    };

    handleSubmit = async () => {
        try {
            this.setState({ loading: true });
            const validation = this.validateForm();

            if (validation) {
                const result = await axios.post('/createRSO', {
                    rsoInfo: { ...this.state.form },
                });

                if (result.data.success) {
                    this.setState({
                        successMessage: `Successfully created new RSO: ${
                            result.data.rso_name
                        }`,
                    });
                } else {
                    throw `Unable to create new RSO`;
                }
            }

            this.setState({ loading: false });
        } catch (err) {
            console.error('Error creating new RSO', err);
            this.setState({
                errorMessage: err && err.message ? `${err.message}` : err,
                loading: false,
            });
        }
    };

    renderChoices = () => {
        return (
            <Card>
                {this.state.form.rso_members.map(student => (
                    <CardContent key={student.uid}>
                        {`${student.firstName} ${student.lastName}`}
                    </CardContent>
                ))}
            </Card>
        );
    };

    handleRadioChoice = prop => event => {
        this.setState({
            form: assign({}, this.state.form, {
                [prop]: event.target.value,
            }),
        });
    };

    renderRSOChoices = () => {
        return (
            <FormControl>
                <FormLabel component="legend">RSOs</FormLabel>
                <RadioGroup
                    aria-label="Event Type"
                    name="rso_id"
                    value={this.state.form.rso_id}
                    onChange={this.handleRadioChoice('rso_id')}
                >
                    {this.state.rsoChoices.map(rso => (
                        <FormControlLabel
                            key={rso.rso_id}
                            value={rso.rso_id + ''}
                            control={<Radio />}
                            label={`${rso.rso_name}`}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    };

    renderEventTypeChoices = () => {
        return (
            <FormControl>
                <FormLabel component="legend">Event Type</FormLabel>
                <RadioGroup
                    aria-label="Event Type"
                    name="event_type"
                    value={this.state.form.event_type}
                    onChange={this.handleRadioChoice('event_type')}
                >
                    {EVENT_TYPES.map(type => (
                        <FormControlLabel
                            key={type}
                            value={type}
                            control={<Radio />}
                            label={`${type.toUpperCase()}`}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    };

    handleSelect = prop => event => {
        this.setState({
            form: assign({}, this.state.form, {
                [prop]: event.target.value,
            }),
        });
    };

    renderLocationChoices = () => {
        let { locationChoices } = this.state;

        // Filter out places that are not happening in this university
        if (
            this.state.form.event_type === 'private' ||
            this.state.form.event_type === 'rso'
        ) {
            locationChoices = locationChoices.filter(
                loc => loc.university === this.state.user.university,
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Select
                    value={this.state.form.event_location_id}
                    onChange={this.handleSelect('event_location_id')}
                    inputProps={{
                        name: 'university-selector',
                        id: 'university-selector',
                    }}
                >
                    {locationChoices.map(loc => (
                        <MenuItem value={loc.location_id} key={loc.location_id}>
                            {`${loc.location_name} at ${loc.university}`}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        console.log('state is', this.state);
        return (
            <FormContainer
                title="Create a New Event"
                loading={this.state.loading}
                minWidth={'400px'}
            >
                <TextField
                    label="Event Name"
                    className={classNames(classes.textField)}
                    type="text"
                    name="event_name"
                    value={this.state.form.event_name}
                    onChange={this.handleChange('event_name')}
                />
                <TextField
                    label="Description"
                    className={classNames(classes.textField)}
                    type="text"
                    name="event_description"
                    value={this.state.form.event_description}
                    onChange={this.handleChange('event_description')}
                    multiline={true}
                    rowsMax={4}
                />
                <TextField
                    id="datetime-local"
                    label="Event Date and Time"
                    type="datetime-local"
                    defaultValue="2018-11-20T20:00"
                    className={classes.textField}
                    onChange={this.handleChange('event_time')}
                />
                <Break height={15} />
                <TextField
                    label="Admin"
                    className={classNames(classes.textField)}
                    type="text"
                    name="admin_name"
                    value={`${this.state.user.firstName} ${
                        this.state.user.lastName
                    }`}
                    disabled={true}
                />
                <Break height={15} />
                {this.renderEventTypeChoices()}
                <Break height={15} />
                {this.state.form.event_type === 'rso'
                    ? this.renderRSOChoices()
                    : null}
                <Break height={15} />
                <InputLabel htmlFor="students-selector">Location</InputLabel>
                <Break height={15} />
                {this.renderLocationChoices()}
                <ErrorMessage message={this.state.errorMessage} />
                <SuccessMessage message={this.state.successMessage} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
            </FormContainer>
        );
    }
}

CreateEvents.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateEvents);

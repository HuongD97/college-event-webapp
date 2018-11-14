import React, { Component } from 'react';
import axios from 'axios';
import { create, deleteUser} from '../services/accounts';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import FormContainer from '../components/FormContainer';
import classNames from 'classnames';
import Router from 'next/router';
import ErrorMessage from "../components/Error";

const styles = theme => ({
    textField: {
        flexBasis: 100,
    },
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            university: '',
            errorMessage: null,
            showPassword: false,
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleSubmit = async () => {
        try {
            const uid = await create(this.state.email, this.state.password);
            const result = await axios.post('/create', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                uid: uid,
                university: this.state.university
            });

            if (result.data.success) {
                Router.push('/login', { user: this.state });
            } else {
                // Delete user from Firebase auth when user was not successfully
                // added to mysql database
                await deleteUser((res) => console.log('User successfully deleted!'));
                this.setState({ errorMessage: 'Could not add user to the database.' });
            }
        } catch (err) {
            // Delete user from Firebase auth when user was not successfully
            // added to mysql database
            await deleteUser((res) => console.log('User successfully deleted!'));
            this.setState({ errorMessage: err.message })
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <FormContainer title="Sign Up">
                <TextField
                    label="First Name"
                    className={classNames(classes.textField)}
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                />
                <TextField
                    label="Last Name"
                    className={classNames(classes.textField)}
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                />
                <TextField
                  label="University"
                  className={classNames(classes.textField)}
                  type="text"
                  name="university"
                  value={this.state.university}
                  onChange={this.handleChange('university')}
                />
                <TextField
                    label="Email"
                    className={classNames(classes.textField)}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                />
                <TextField
                    className={classNames(classes.textField)}
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <ErrorMessage message={this.state.errorMessage}/>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Sign Up
                </Button>
            </FormContainer>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);

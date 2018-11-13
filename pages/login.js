import React, { Component } from 'react';
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
import { signIn } from '../services/accounts';
import Router from 'next/router';
import axios from 'axios';

const styles = theme => ({
    textField: {
        flexBasis: 100,
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            email: '',
            password: '',
            errorCode: null,
            errorMessage: null,
            showPassword: false,
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = async () => {
        try {
            const result = await signIn(this.state.email, this.state.password);
            Router.push(`/user?uid=${result.user.uid}`);
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <FormContainer title="Sign In">
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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Sign In
                </Button>
            </FormContainer>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

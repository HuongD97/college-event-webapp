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
import ErrorMessage from '../components/Error';

const styles = theme => ({
    textField: {
        flexBasis: 100,
    },
});

class CreateRSOs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            email: '',
            password: '',
            errorMessage: null,
            showPassword: false,
            loading: false,
            form: {
                rso_name: '',
                rso_university: '',
                rso_description: '',
                rso_admin_id: ''
            }
        }
        ;
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = async () => {
        try {
            const result = await signIn(this.state.email, this.state.password);
            Router.push(`/loggedIn?uid=${result.user.uid}`);
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                this.setState({
                    errorMessage: `${
                        this.state.email
                    } is not registered in our system.`,
                });
            } else {
                this.setState({
                    errorMessage: `${err.message}`,
                });
            }
        }
    };

    render() {
        const { classes, user } = this.props;
        console.log('user is', user);
        return (
            <FormContainer title="Create New RSO" loading={this.state.loading}>
                <TextField
                  label="RSO Name"
                  className={classNames(classes.textField)}
                  type="text"
                  name="rso_name"
                  value={this.state.rso_name}
                  onChange={this.handleChange('university')}
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
                <ErrorMessage message={this.state.errorMessage} />
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

CreateRSOs.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateRSOs);

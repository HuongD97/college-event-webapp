import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Break from './Break';
import axios from 'axios/index';
import Success from './Success';
import Error from './Error';
import FormContainer from './FormContainer';

const AddLocation = props => {
    const [location_name, setLocationName] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [university, setUniversity] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getValidation = () => {
        if (
            location_name === '' ||
            longitude === '' ||
            latitude === '' ||
            university === ''
        ) {
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        try {
            const validation = getValidation();
            if (!validation) {
                setErrorMessage(
                    'Please fill out the entire form before continuing.',
                );
                setSuccessMessage('');
                return;
            }
            const payload = {
                location_name: location_name,
                university: university,
                longitude: longitude,
                latitude: latitude,
            };
            const res = await axios.post('/addLocation', { ...payload });
            if (res.data.success) {
                setErrorMessage('');
                setSuccessMessage('Successfully added location');
            } else if (res.data.code === 'ER_DUP_ENTRY') {
                setErrorMessage(
                    'There is already another location registered with that longitude and latitude',
                );
                setSuccessMessage('');
            } else if (res.data.code === 'ER_BAD_FIELD_ERROR') {
                setErrorMessage('Longitude and latitude must be a number');
                setSuccessMessage('');
            } else {
                setErrorMessage('Unable to add location');
                setSuccessMessage('');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = name => event => {
        switch (name) {
            case 'location_name':
                setLocationName(event.target.value);
                break;
            case 'longitude':
                setLongitude(event.target.value);
                break;
            case 'latitude':
                setLatitude(event.target.value);
                break;
            case 'university':
                setUniversity(event.target.value);
                break;
        }
    };

    const Save = () => {
        return (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSave()}
            >
                Save
            </Button>
        );
    };

    const renderAddLocationForm = () => {
        return (
            <FormContainer title="Add New Location" minWidth={'400px'}>
                <Break height={15} />
                <TextField
                    label="Location Name"
                    type="text"
                    name="location_name"
                    value={location_name}
                    onChange={handleChange('location_name')}
                    multiline={true}
                    rowsMax={4}
                    fullWidth
                />
                <Break height={15} />

                <TextField
                    label="Latitude"
                    type="number"
                    name="latitude"
                    value={latitude}
                    onChange={handleChange('latitude')}
                    multiline={true}
                    rowsMax={4}
                    fullWidth
                />
                <Break height={15} />

                <TextField
                    label="Longitude"
                    type="number"
                    name="longitude"
                    value={longitude}
                    onChange={handleChange('longitude')}
                    multiline={true}
                    rowsMax={4}
                    fullWidth
                />
                <Break height={15} />

                <TextField
                    label="University"
                    type="text"
                    name="comment"
                    value={university}
                    onChange={handleChange('university')}
                    multiline={true}
                    rowsMax={4}
                    fullWidth
                />
                <Break height={15} />
                <Success message={successMessage} />
                <Error message={errorMessage} />
                <Break height={15} />
                <Save />
            </FormContainer>
        );
    };

    return renderAddLocationForm();
};

export default AddLocation;

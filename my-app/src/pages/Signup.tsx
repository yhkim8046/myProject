import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Signup.module.css';

const Signup = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value);
    };

    const handleSignUpClick = async () => {
        if (password !== passwordConfirmation) {
            alert('Passwords do not match.');
            return;
        }

        // Backend API URL
        const apiUrl = 'http://localhost:5131/api/users/register';

        // Requested sign up data
        const signupData = {
            userId: userId,
            password: password,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                console.log('Registration successful');
                alert('Registration successful. Please log in.');
                navigate('/Home'); // Redirect upon success
            } else {
                console.error('Registration failed');
                const errorData = await response.json();
                alert(errorData.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <TextField
                        required
                        id="userId"
                        label="ID"
                        variant="outlined"
                        fullWidth
                        value={userId}
                        onChange={handleUserIdChange}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        required
                        id="passwordConfirmation"
                        label="Password Confirmation"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                    />
                    <Button
                        onClick={handleSignUpClick}
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={styles.signupButton}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default Signup;

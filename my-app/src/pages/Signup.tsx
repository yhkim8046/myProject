import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../styles/Signup.module.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/Home');
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
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        required
                        id="passwordConfirmation"
                        label="Password Confirmation"
                        type="password"
                        variant="outlined"
                        fullWidth
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
}

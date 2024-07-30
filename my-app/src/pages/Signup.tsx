import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/Signup.css';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

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
            <div className="container">
                <div className="form-container">
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
                        label="password"
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
                    <Button onClick={handleSignUpClick}
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="signup-button"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </Box>
    );
}

import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../styles/Home.css';

const Home = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleLoginClick = () => {
        navigate('/Posting');

        console.log('Username:', userName);
        console.log('Password:', password);
    };

    const navigate = useNavigate();

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Sign in</h2>
                <div className="login-input-container">
                    <input
                        type="text"
                        placeholder="ID"
                        value={userName}
                        onChange={handleUsernameChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="login-input"
                    />
                </div>
                <div className="login-options">
                    <Button variant="outlined" className="login-btn" onClick={handleLoginClick}>Sign in</Button>
                </div>
                <div className="login-links">
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;

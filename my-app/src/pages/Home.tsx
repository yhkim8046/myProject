import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleLoginClick = async () => {
        // Backend API URL
        const apiUrl = 'http://localhost:5131/api/users/login';

        // Login request data
        const loginData = {
            userId: username,
            password: password,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const responseData = await response.json();

                // Store JWT Token into localStorage (will be replaced by cookies)
                localStorage.setItem('token', responseData.token);

                // Store userId into localStorage
                localStorage.setItem('userId', responseData.userId);

                //redirect
                navigate('/Posting');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);
                alert('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <h2 className={styles.loginTitle}>Sign in</h2>
                <div className={styles.loginInputContainer}>
                    <input
                        type="text"
                        placeholder="ID"
                        value={username}
                        onChange={handleUsernameChange}
                        className={styles.loginInput}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={styles.loginInput}
                    />
                </div>
                <div className={styles.loginOptions}>
                    <Button variant="outlined" className={styles.loginBtn} onClick={handleLoginClick}>Sign in</Button>
                </div>
                <div className={styles.loginLinks}>
                    <Link to="/Signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

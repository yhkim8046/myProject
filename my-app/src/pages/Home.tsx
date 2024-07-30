import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleLoginClick = () => {
        navigate('/Posting');

        console.log('Username:', username);
        console.log('Password:', password);
    };

    const navigate = useNavigate();

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
                        placeholder="password"
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
}

export default Home;

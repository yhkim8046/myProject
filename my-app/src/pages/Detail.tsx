import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from '../styles/Detail.module.css';

const Detail = () => {
    const location = useLocation();
    const { id, date, time, title, content } = location.state || {
        id: 0,
        date: '',
        time: '',
        title: '',
        content: ''
    };

    const navigate = useNavigate();
    const [contentSize, setContentSize] = useState(content);

    const handleShareClick = () => {
        navigate('/Feedback');
    };

    const handleContentChange = (e: { target: { value: any; }; }) => {
        setContentSize(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Diary on {date} {time}</h1>
            </div>
            <div className={styles.titleContainer}>
                <h2 className={styles.titleText}>Title: {title}</h2>
            </div>
            <hr />
            <div className={styles.contentContainer} style={{
                height: content ? `${Math.min(60, 20 + content.length / 5)}%` : 'auto'
            }}>
                <label htmlFor="content"></label>
                <textarea
                    id="content"
                    name="content"
                    className={styles.contentText}
                    value={contentSize}
                    onChange={handleContentChange}
                    style={{ height: '100%', width: '100%', border: 'none', padding: '0' }}
                />
            </div>
            <hr />
            <Button variant="outlined" onClick={handleShareClick}>Motivate</Button>
        </div>
    );
}

export default Detail;

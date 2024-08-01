import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Posting.module.css';
import Button from '@mui/material/Button';

const Posting: React.FC = () => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleShareClick = () => {
        const diary = {
            id:Date.now(),
            date:new Date().toLocaleDateString(),
            time:new Date().toLocaleTimeString(),
            title,
            content
        };
        
        navigate('/detail', {state:diary});
    };
    //line 42 need to confirm what was the input-container
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <h1>How was your day {userName}?</h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="title"
                        className={styles.title}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <hr/>
                    <textarea
                        placeholder="share your day"
                        className={styles.content}
                        value={content}
                        onChange={handleContentChange}
                    ></textarea>
                </div>
                <hr/>
                <div className={styles.buttonContainer}>
                    <Button variant="outlined">More...</Button>
                    <Button variant="outlined" onClick={handleShareClick}>Post</Button>
                </div>
            </div>
        </div>
    );
}

export default Posting;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Posting.module.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Posting: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const userId = localStorage.getItem('userId');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleShareClick = async () => {
        const userId = localStorage.getItem('userId');
    
        if (!userId) {
            console.error('User ID not found in local storage');
            alert('Please log in to post a diary.');
            navigate('/login'); 
            return;
        }
    
        const now = new Date();
        const diary = {
            userId, 
            date: now.toISOString(),
            title,
            content,
            time: now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
    
        try {
            const response = await fetch('http://localhost:5131/api/diaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(diary),
            });
    
            if (response.ok) {
                const savedDiary = await response.json();
                navigate(`/detail/${savedDiary.diaryId}`, { state: savedDiary }); // Detail 페이지로 이동
            } else {
                const errorText = await response.text();
                console.error('Failed to post diary:', errorText);
                alert('Failed to post diary: ' + errorText);
            }
        } catch (error) {
            console.error('An error occurred while posting diary:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <h1>
                        <Link to="/Diaries" className={styles.link}>How was your day? {userId}</Link>
                    </h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        className={styles.title}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <hr/>
                    <textarea
                        placeholder="Share your day"
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

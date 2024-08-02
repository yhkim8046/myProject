import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Posting.module.css';
import Button from '@mui/material/Button';

const Posting: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
            return;
        }
    
        const diary = {
            userId, // UserId만 전송
            date: new Date().toISOString(),
            title,
            content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), // 'HH:MM' 형식으로 변환
        };
    
        try {
            const response = await fetch('http://localhost:5182/api/diaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(diary),
            });
    
            if (response.ok) {
                const savedDiary = await response.json();
                navigate(`/detail/${savedDiary.DiaryId}`, { state: savedDiary }); // Detail 페이지로 이동
            } else {
                console.error('Failed to post diary');
            }
        } catch (error) {
            console.error('An error occurred while posting diary:', error);
        }
    };
    
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <h1>How was your day?</h1>
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

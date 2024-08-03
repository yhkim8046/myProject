// src/pages/Edit.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/Posting.module.css';
import Button from '@mui/material/Button';

const EditDiary: React.FC = () => {
    const { diaryId } = useParams<{ diaryId: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const fetchDiary = async () => {
            if (!diaryId) {
                console.error('Diary ID is not provided');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5131/api/diaries/${diaryId}`);
                if (response.ok) {
                    const diary = await response.json();
                    setTitle(diary.title);
                    setContent(diary.content);
                } else {
                    console.error('Failed to fetch diary');
                }
            } catch (error) {
                console.error('Error fetching diary:', error);
            }
        };

        fetchDiary();
    }, [diaryId]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleUpdateClick = async () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('User ID not found in local storage');
            alert('Please log in to update the diary.');
            navigate('/login');
            return;
        }

        if (!diaryId) {
            console.error('Diary ID is not available');
            return;
        }

        const updatedDiary = {
            diaryId: parseInt(diaryId, 10),
            userId,
            date: new Date().toISOString(),
            title,
            content,
        };

        try {
            const response = await fetch(`http://localhost:5131/api/diaries/${diaryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDiary),
            });

            if (response.ok) {
                navigate(`/detail/${diaryId}`);
            } else {
                const errorText = await response.text();
                console.error('Failed to update diary:', errorText);
                alert('Failed to update diary: ' + errorText);
            }
        } catch (error) {
            console.error('An error occurred while updating the diary:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <div className={styles.greeting}>
                    <h1>Edit Your Diary</h1>
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
                    <Button variant="outlined" onClick={handleUpdateClick}>Update</Button>
                </div>
            </div>
        </div>
    );
}

export default EditDiary;

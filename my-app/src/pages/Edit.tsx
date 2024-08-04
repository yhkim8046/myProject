// src/pages/Edit.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from '../styles/Posting.module.css';
import Button from '@mui/material/Button';

const EditDiary: React.FC = () => {
    const { diaryId } = useParams<{ diaryId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const diary = location.state?.diary;

    // 상태로부터 diary 객체의 값 가져오기
    const [title, setTitle] = useState<string>(diary?.title || '');
    const [content, setContent] = useState<string>(diary?.content || '');
    const [date, setDate] = useState<string>(diary?.date || '');
    const [time, setTime] = useState<string>(diary?.time || '');
    const [userId, setUserId] = useState<string>(diary?.userId || '');

    useEffect(() => {
        if (!diary) {
            const fetchDiary = async () => {
                if (!diaryId) {
                    console.error('Diary ID is not provided');
                    return;
                }

                try {
                    const response = await fetch(`http://localhost:5131/api/diaries/${diaryId}`);
                    if (response.ok) {
                        const fetchedDiary = await response.json();
                        setTitle(fetchedDiary.title);
                        setContent(fetchedDiary.content);
                        setDate(fetchedDiary.date);
                        setTime(fetchedDiary.time);
                        setUserId(fetchedDiary.userId);
                    } else {
                        console.error('Failed to fetch diary');
                    }
                } catch (error) {
                    console.error('Error fetching diary:', error);
                }
            };

            fetchDiary();
        }
    }, [diary, diaryId]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleUpdateClick = async () => {
        const storedUserId = localStorage.getItem('userId') || userId;

        if (!storedUserId) {
            console.error('User ID not found in local storage');
            alert('Please log in to update the diary.');
            navigate('/login');
            return;
        }

        if (!diaryId || isNaN(parseInt(diaryId, 10))) {
            console.error('Diary ID is not valid');
            return;
        }

        const updatedDiary = {
            diaryId: parseInt(diaryId, 10),
            userId: storedUserId,
            date,
            time,
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
                navigate(`/diaries`);
            } else {
                const errorData = await response.json();
                console.error('Failed to update diary:', errorData);
                alert('Failed to update diary: ' + JSON.stringify(errorData));
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

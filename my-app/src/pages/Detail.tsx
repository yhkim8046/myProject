import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from '../styles/Detail.module.css';

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [diary, setDiary] = useState({
        id: 0,
        date: '',
        time: '',
        title: '',
        content: ''
    });

    useEffect(() => {
        console.log('Location state:', location.state); // 상태 확인
        if (location.state) {
            setDiary(location.state);
        } else {
            const diaryIdString = location.pathname.split('/').pop();
            const diaryId = diaryIdString ? parseInt(diaryIdString, 10) : undefined;
    
            if (diaryId !== undefined) {
                fetchDiary(diaryId);
            } else {
                console.error('Invalid DiaryId');
            }
        }
    }, [location.state, location.pathname]);
    

    const fetchDiary = async (DiaryId: number | undefined) => {
        if (DiaryId === undefined) {
            console.error('DiaryId is undefined');
            return;
        }
    
        try {
            const response = await fetch(`/api/diaries/${DiaryId}`);
            if (response.ok) {
                const fetchedDiary = await response.json();
                console.log('Fetched Diary:', fetchedDiary);  
                setDiary(fetchedDiary);
            } else {
                console.error('Failed to fetch diary');
            }
        } catch (error) {
            console.error('An error occurred while fetching diary:', error);
        }
    };
    
    

    const handleShareClick = () => {
        navigate('/Feedback');
    };

    const displayDate = new Date(diary.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const displayTime = new Date(diary.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.titleText}>Title: {diary.title}</h2>
            </div>
            <div className={styles.header}>
                <p>Diary on {displayDate} {displayTime}</p>
            </div>
            <hr />
            <div className={styles.contentContainer} style={{
                height: diary.content ? `${Math.min(60, 20 + diary.content.length / 5)}%` : 'auto'
            }}>
                <label htmlFor="content"></label>
                <textarea
                    id="content"
                    name="content"
                    className={styles.contentText}
                    value={diary.content}
                    readOnly
                    style={{ height: '100%', width: '100%', border: 'none', padding: '0' }}
                />
            </div>
            <hr />
            <Button variant="outlined" onClick={handleShareClick}>Motivate</Button>
        </div>
    );    
}

export default Detail;

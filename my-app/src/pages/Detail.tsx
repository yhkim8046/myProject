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

    const handleMotivateClick = () => {
        navigate('/Feedback');
    };

    const handleDeleteClick = () => {
        navigate('/Diaries');
    };

    const handleEditClick = () => {
        navigate('/Edit');
    };

    // 사용자가 읽기 쉬운 형식으로 표시
    const displayDate = new Date(diary.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const displayTime = new Date(diary.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.titleText}>Title: {diary.title}</h2>
                    <p>Diary on {displayDate} {displayTime}</p>
                </div>
                <Button variant="outlined" className={styles.editButton} onClick={handleEditClick}>Edit</Button>
            </div>
            <hr />
            <div className={styles.contentContainer} style={{
                height: diary.content ? `${Math.min(80, 20 + diary.content.length / 5)}%` : 'auto'
            }}>
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
            <div className={styles.buttonContainer}>
                <Button variant="outlined" onClick={handleDeleteClick}>Delete</Button>
                <Button variant="outlined" onClick={handleMotivateClick}>Motivate</Button>
            </div>
        </div>
    );
}

export default Detail;

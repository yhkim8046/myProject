import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from '../styles/Detail.module.css';

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [diary, setDiary] = useState({
        DiaryId: 0, // ID 필드 수정
        date: '',
        time: '',
        title: '',
        content: ''
    });

    useEffect(() => {
        if (location.state) {
            console.log('Location state:', location.state);
            setDiary({
                DiaryId: location.state.diaryId, // 서버에서 받은 필드명과 일치시킴
                date: location.state.date,
                time: location.state.time,
                title: location.state.title,
                content: location.state.content
            });
        } else {
            const diaryIdString = location.pathname.split('/').pop();
            console.log('Diary ID string:', diaryIdString);
            const diaryId = diaryIdString ? parseInt(diaryIdString, 10) : undefined;
    
            if (diaryId !== undefined && !isNaN(diaryId)) {
                fetchDiary(diaryId);
            } else {
                console.error('Invalid DiaryId:', diaryIdString);
            }
        }
    }, [location.state, location.pathname]);
    
    const fetchDiary = async (DiaryId: number | undefined) => {
        if (DiaryId === undefined) {
            console.error('DiaryId is undefined');
            return;
        }
    
        try {
            console.log('Fetching diary with ID:', DiaryId);
            const response = await fetch(`/api/diaries/${DiaryId}`);
            if (response.ok) {
                const fetchedDiary = await response.json();
                console.log('Fetched Diary:', fetchedDiary);
                setDiary(fetchedDiary);
            } else {
                console.error('Failed to fetch diary, status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred while fetching diary:', error);
        }
    };
    
    const handleMotivateClick = () => {
        navigate('/Feedback');
    };

    const handleDeleteClick = async () => {
        if (!diary.DiaryId) { // ID 필드 확인
            console.error('Diary ID is not available');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5131/api/diaries/${diary.DiaryId}`, { // DiaryId로 삭제 요청
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log('Diary deleted successfully');
                navigate('/Diaries'); // 성공적으로 삭제되면 다이어리 목록 페이지로 이동
            } else {
                console.error('Failed to delete diary');
            }
        } catch (error) {
            console.error('An error occurred while deleting the diary:', error);
        }
    };
    
    const handleEditClick = () => {
        navigate('/Edit');
    };

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
            <div className={styles.contentContainer}>
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

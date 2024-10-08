import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from '../styles/Detail.module.css';

const Detail = () => {
    const location = useLocation();
    const { diaryId } = useParams<{ diaryId: string }>();
    const navigate = useNavigate();
    const [diary, setDiary] = useState({
        diaryId: 0, 
        date: '',
        time: '',
        title: '',
        content: '',
        userId: ''
    });

    useEffect(() => {
        if (location.state) {
            console.log('Location state:', location.state); 
            setDiary({
                diaryId: location.state.diaryId, 
                date: location.state.date,
                time: location.state.time,
                title: location.state.title,
                content: location.state.content,
                userId: location.state.userId
            });
        } else {
            const diaryIdString = location.pathname.split('/').pop();
            console.log('Diary ID string:', diaryIdString);
            const diaryIdNum = diaryIdString ? parseInt(diaryIdString, 10) : undefined;
    
            if (diaryIdNum !== undefined && !isNaN(diaryIdNum)) {
                fetchDiary(diaryIdNum);
            } else {
                console.error('Invalid diaryId:', diaryIdString);
            }
        }
    }, [location.state, location.pathname]);
    
    const fetchDiary = async (diaryId: number | undefined) => {
        if (diaryId === undefined) {
            console.error('diaryId is undefined');
            return;
        }
    
        try {
            console.log('Fetching diary with ID:', diaryId);
            const response = await fetch(`/api/diaries/${diaryId}`);
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

    const handlehistoryClick = () => {
        navigate('/Diaries');
    };

    const handleDeleteClick = async () => {
        if (!diary.diaryId) { 
            console.error('Diary ID is not available');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5131/api/diaries/${diary.diaryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Diary deleted successfully');
                navigate('/Posting'); 
            } else {
                console.error('Failed to delete diary');
            }
        } catch (error) {
            console.error('An error occurred while deleting the diary:', error);
        }
    };
    
    const handleEditClick = () => {
        const editDiary = {
            diaryId: diary.diaryId,
            date: diary.date,
            time: diary.time,
            title: diary.title,
            content: diary.content,
            userId: diary.userId
        };
        
        console.log("Navigating with diary:", editDiary);
        navigate(`/edit/${diary.diaryId}`, {
            state: { diary: editDiary }
        });
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
                <Button variant="outlined" onClick={handlehistoryClick}>Histroy</Button>
            </div>
        </div>
    );
}

export default Detail;

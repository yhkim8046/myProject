// src/components/DiariesList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from '../styles/Diaries.module.css';
import { useNavigate } from 'react-router-dom';

const Diaries: React.FC = () => {
    const [diaries, setDiaries] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const response = await fetch('/api/diaries');
                if (response.ok) {
                    const data = await response.json();
                    setDiaries(data);
                } else {
                    console.error('Failed to fetch diaries');
                }
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };

        fetchDiaries();
    }, []);

    return (
        <div className={styles.container}>
            <h1>My Diaries</h1>
            <div className={styles.diariesList}>
                {diaries.map(diary => (
                    <div key={diary.id} className={styles.diaryItem}>
                        <h2>{diary.title}</h2>
                        <p>{diary.content.substring(0, 100)}...</p>
                        <Link to={`/detail/${diary.id}`}>Read more</Link>
                    </div>
                ))}
            </div>
            <Button variant="outlined" onClick={() => navigate('/Posting')}>New Diary</Button>
        </div>
    );
};

export default Diaries;

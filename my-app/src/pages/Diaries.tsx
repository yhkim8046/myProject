import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from '../styles/Diaries.module.css';

const Diaries: React.FC = () => {
    const [diaries, setDiaries] = useState<any[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
                console.log('Fetched userId from local storage:', userId);

                if (!userId) {
                    console.error('User ID not found in local storage');
                    navigate('/login'); // Redirect to login page if user ID is not found
                    return;
                }

                console.log('Fetching diaries for userId:', userId);
                const response = await fetch(`http://localhost:5131/api/diaries/${userId}`); // Use absolute path
                console.log('Response status:', response.status);

                if (response.ok) {
                    // Log the response body as text
                    const responseText = await response.text();
                    console.log('Response text:', responseText);

                    // Attempt to parse the JSON
                    try {
                        const data = JSON.parse(responseText);
                        console.log('Fetched diaries data:', data);
                        setDiaries(data);
                    } catch (parseError) {
                        console.error('Error parsing JSON:', parseError);
                    }
                } else {
                    console.error('Failed to fetch diaries, status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };

        fetchDiaries();
    }, [navigate]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
            <h1>My Diaries</h1>
            <Button variant="outlined" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <div className={styles.diariesList}>
                {diaries.map(diary => (
                    <div key={diary.diaryId} className={`${styles.diaryItem} ${isDarkMode ? styles.dark : ''}`}>
                        <h2>{diary.title}</h2>
                        <p>{diary.content.substring(0, 100)}...</p>
                        <Button onClick={() => navigate(`/detail/${diary.diaryId}`, { state: { diaryId: diary.diaryId, date: diary.date, time: diary.time, title: diary.title, content: diary.content } })}>Read more</Button>
                    </div>
                ))}
            </div>
            <Button variant="outlined" onClick={() => navigate('/Posting')}>New Diary</Button>
        </div>
    );
};

export default Diaries;

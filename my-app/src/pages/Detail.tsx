import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../styles/Detail.css';

const Detail: React.FC = () => {
    const location = useLocation();
    const { id, date, time, title, content } = location.state as {
        id: number,
        date: string,
        time: string,
        title: string,
        content: string
    };

    const navigate = useNavigate();

    const handleShareClick = () => {
        navigate('/Feedback');
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Diary on {date}</h1>
            </div>
            <div className="titleContainer">
                <h2 className="titleText">Title: {title}</h2>
            </div>
            <div className="contentContainer">
                <p className="contentText">Content: {content}</p>
                <p className="contentText">ID: {id}</p>
                <p className="contentText">Date: {date}</p>
                <p className="contentText">Time: {time}</p>
            </div>
            <div className="timeContainer">
                <p className="timeText">Time: {time}</p>
            </div>
            <Button variant="outlined" onClick={handleShareClick}>Motivate</Button>
        </div>
    );
}

export default Detail;

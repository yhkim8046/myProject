import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import '../styles/Detail.css';

const Detail = () => {
    const location = useLocation();
    const { id, date, time, title, content } = location.state as {
        id: number,
        date: string,
        time: string,
        title: string,
        content: string
    };

    const navigate = useNavigate();
    const [contentSize, setContentSize] = useState('');

    const handleShareClick = () => {
        navigate('/Feedback');
    };

    const handleContentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setContentSize(e.target.value);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Diary on {date} {time}</h1>
            </div>
            <div className="titleContainer">
                <h2 className="titleText">Title: {title}</h2>
            </div>
            <hr />
            <div className="contentContainer" style={{
                height: content ? `${Math.min(60, 20 + content.length / 5)}%` : 'auto'
            }}>
                <label htmlFor="content"></label>
                <textarea
                    id="content"
                    name="content"
                    className="contentText"
                    value={content}
                    onChange={handleContentChange}
                    style={{ height: '100%', width: '100%', border: 'none', padding: '0' }}
                />
            </div>
            <hr />
            <Button variant="outlined" onClick={handleShareClick}>Motivate</Button>
        </div>
    );
}

export default Detail;

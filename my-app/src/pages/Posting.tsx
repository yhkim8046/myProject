import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Posting.css';
import Button from '@mui/material/Button';

const Posting: React.FC = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleShareClick = () => {
        const diary = {
            id:Date.now(),
            date:new Date().toLocaleDateString(),
            time:new Date().toLocaleTimeString(),
            title,
            content
        };
        
        navigate('/detail', {state:diary});
    };

    return (
        <div className="app">
            <div className="container">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="title"
                        className="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <textarea
                        placeholder="share your day"
                        className="content"
                        value={content}
                        onChange={handleContentChange}
                    ></textarea>
                </div>
                <div className="button-container">
                    <Button variant="outlined">More...</Button>
                    <Button variant="outlined" onClick={handleShareClick}>Share</Button>
                </div>
            </div>
        </div>
    );
}

export default Posting;

import React from 'react';
import { useLocation } from 'react-router-dom';

const Detail: React.FC = () => {
    const location = useLocation();
    const { id, date, time, title, content } = location.state as {
        id: number,
        date: string,
        time: string,
        title: string,
        content: string
    };

    return (
        <div>
            <h1>Detail Page</h1>
            <h2>Title: {title}</h2>
            <p>Content: {content}</p>
            <p>ID: {id}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
        </div>
    );
}

export default Detail;

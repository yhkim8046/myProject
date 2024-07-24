import React from 'react';
import '../styles/Posting.css';

const Posting: React.FC = () => {
    return (
        <div className="app">
            <div className="container">
                <input
                    type="text"
                    placeholder="title"
                    className="title-input"
                />
                <textarea
                    placeholder="share your day"
                    className="content-textarea"
                ></textarea>
            </div>
        </div>
    );
}

export default Posting;

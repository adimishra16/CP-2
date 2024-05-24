import React from 'react';
import './NewsItem.css';

const NewsItem = ({ title, description, imageUrl, newsUrl }) => {
  return (
    <div className="news-item">
      <img src={imageUrl} alt={title} />
      <div className="news-item-content">
        <h3 className="news-item-title">{title}</h3>
        <p className="news-item-description">{description}</p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </div>
  );
};

export default NewsItem;



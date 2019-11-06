import React from 'react';

const TrackCard = props => {
  const moodElements = () => {
    return props.mood.map(mood => {
      return <li>{mood}</li>;
    });
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title title">{props.trackTitle}</p>
      </header>
      <div className="card-content content">
        <p>Genre: {props.genre}</p>
        <p>Public?: {props.isPublic}</p>
        <p>Price: {props.price}</p>
        <p>Moods:</p>
        <ul>{moodElements()}</ul>
        <p>Track URL: {props.trackUrl}</p>
        <p>Image URL: {props.coverUrl}</p>
      </div>
    </div>
  );
};

export default TrackCard;

import React from 'react';

const TrackCard = props => {
  const moodElements = () => {
    return props.mood.map(mood => {
      return (
        <div>
          <p>{mood}</p>
        </div>
      );
    });
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title title">{props.trackTitle}</p>
      </header>
      <div className="card-content">
        <p>Genre: {props.genre}</p>
        <p>Public?: {props.isPublic}</p>
        <p>Moods: {moodElements}</p>
        <p>Price: {props.price}</p>
        <p>Track URL: {props.trackUrl}</p>
        <p>Image URL: {props.coverUrl}</p>
      </div>
    </div>
  );
};

export default TrackCard;

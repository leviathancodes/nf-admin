import React from 'react';
import { Link } from 'react-router-dom';

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
        <p>Similar Artists: {props.similarArtists}</p>
        <p>Track URL: {props.trackUrl}</p>
        <p>Image URL: {props.coverUrl}</p>
        <Link to={`/music/${props.trackTitle.replace(/ /g, '_').toLowerCase()}`} type="button" className="button is-button is-primary">
          Edit
        </Link>
        <hr />
        <button type="button" className="button is-danger">Delete</button>
      </div>
    </div>
  );
};

export default TrackCard;

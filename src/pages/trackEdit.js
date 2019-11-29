import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from '../components/form/editForm';

const TrackEdit = (props) => {
  const [trackData, setTrackData] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.info(props.match.params.track);
      console.info(`http://localhost:5000/music/search?term=${props.match.params.track}`);
      const res = await axios.get(
        `http://localhost:5000/music/search?term=${props.match.params.track}`
      );
      console.log(res.data[0]);
      setTrackData(res.data[0]);
    }
    fetchData();
  }, []);

  return (
    <EditForm
      genreInput={trackData.genre}
      trackTitle={trackData.presentationTitle}
      isPublic={trackData.isPublic}
      moodTags={trackData.mood}
      price={trackData.price}
      similarArtists={trackData.similarArtists}
      bpm={trackData.bpm}
      requestTitle={trackData.trackTitle}
    />
  );
};

export default TrackEdit;

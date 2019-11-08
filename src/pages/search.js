import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchContext } from '../context/searchContext';
import TrackCard from '../components/trackCard';

const SearchResults = props => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:5000/music/search?term=${props.match.params.term}`
      );
      setSearchResults(res.data);
    }
    fetchData();
  }, []);

  const createResults = () => {
    if (searchResults.length < 1) {
      return <h1>No results found</h1>;
    }
    return searchResults.map(data => {
      return (
        <TrackCard
          trackTitle={data.trackTitle}
          genre={data.genre}
          public={data.isPublic}
          price={data.price}
          mood={data.mood}
          trackUrl={data.trackUrl}
          coverUrl={data.imageUrl}
        />
      );
    });
  };

  return <div className="container">{createResults()}</div>;
};

export default SearchResults;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  }, [props]);

  const createResults = () => {
    if (searchResults.length < 1) {
      return <h1>No results found</h1>;
    }
    return searchResults.map(data => {
      return (
        <h1>Hello World</h1>
      );
    });
  };

  return <div className="container">{createResults()}</div>;
};

export default SearchResults;

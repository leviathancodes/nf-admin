/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditForm = (props) => {

  const [submitStatus, setSubmitStatus] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [moodInput, setMoodInput] = useState('');
  const [moodTags, setMoodTags] = useState(props.moodTags);
  const [genreInput, setGenreInput] = useState(props.genreInput);
  const [track, setTrack] = useState(props.trackTitle);
  const [requestTitle, setRequestTitle] = useState('');
  const [isPublic, setPublic] = useState(props.isPublic);
  const [price, setPrice] = useState(props.price);
  const [bpm, setBPM] = useState(props.bpm);
  const [loading, isLoading] = useState('');
  const [disabled, isDisabled] = useState(false);
  const [similarArtistsInput, setSimilarArtistsInput] = useState('');
  const [similarArtistsTags, setSimilarArtistsTags] = useState(props.similarArtists);

  useEffect(() => {
    setMoodTags(props.moodTags);
    setGenreInput(props.genreInput);
    setSimilarArtistsTags(props.similarArtists);
    setBPM(props.bpm);
    setPublic(props.isPublic);
    setPrice(props.price);
    setTrack(props.trackTitle);
    setRequestTitle(props.requestTitle);
  }, [props]);

  const handlePublic = e => {
    console.log(e.target.id);
    e.target.id === 'Yes' ? setPublic('Yes') : setPublic('No');
  };

  const removeMoodTag = e => {
    let tags = moodTags;
    tags = tags.filter(val => {
      return val !== e.target.innerHTML;
    });
    setMoodTags(tags);
  };

  const removeSimilarArtistTag = e => {
    let tags = similarArtistsTags;
    tags = tags.filter(val => {
      return val !== e.target.innerHTML;
    });
    setSimilarArtistsTags(tags);
  };

  const createMoodTags = () => {
    if (moodTags) {
      return moodTags.map(tag => {
        return (
          <p key={tag} className="control">
            <button onClick={removeMoodTag} type="button" className="button">
              {tag}
            </button>
          </p>
        );
      });
    }
  };

  const createSimilarArtistTags = () => {
    return similarArtistsTags.map(tag => {
      return (
        <p key={tag} className="control">
          <button
            onClick={removeSimilarArtistTag}
            type="button"
            className="button"
          >
            {tag}
          </button>
        </p>
      );
    });
  };

  const handleAddMoodTag = () => {
    if (moodInput) {
      setMoodTags(moodTags.concat(moodInput));
      setMoodInput('');
    }
  };

  const handleAddSimilarArtistTag = () => {
    if (similarArtistsInput) {
      setSimilarArtistsTags(similarArtistsTags.concat(similarArtistsInput));
      setSimilarArtistsInput('');
    }
  };

  const handleSubmit = async e => {
    isLoading('is-loading');
    isDisabled(true);
    e.preventDefault();

    const data = {
      trackTitle: track,
      genre: genreInput,
      mood: moodTags,
      similarArtists: similarArtistsTags,
      isPublic,
      price,
      bpm
    };
    console.log(encodeURIComponent(requestTitle));
    try {
      const res = await axios.patch(`http://localhost:5000/music?trackTitle=${encodeURIComponent(requestTitle)}`, data);
      console.log(res);
      setSubmitStatus(res.data.status);
      setSubmitMessage(res.data.message);
    } catch (error) {
      if (error.response) {
        // setSubmitStatus(error.data.status);
        // setSubmitMessage(error.data.message);
        console.log(error);
      } else if (error.request) {
        setSubmitStatus('error');
        setSubmitMessage(
          `Track edit failed. ${error.toJSON()}: Our servers may be offline or undergoing maintanence. ${
            error.status
          }`
        );
      } else {
        console.log(error);
        setSubmitStatus('error');
        setSubmitMessage(
          `Track edit failed. ${error.message} ${String(error)}`
        );
      }
    }
    isLoading('');
    isDisabled('');
  };

  const removeSubmitMessaging = () => {
    setSubmitStatus(false);
    setSubmitMessage(false);
  };

  const submitMessaging = () => {
    if (!submitStatus && !submitStatus) {
      return;
    }
    const statusClass =
      submitStatus === 'success'
        ? 'notification is-success'
        : 'notification is-danger';
    return (
      <article className={statusClass}>
        <button
          type="button"
          className="delete"
          onClick={removeSubmitMessaging}
        />
        {submitMessage}
      </article>
    );
  };

  return (
    <div className="container form-container">
      <h1 className="title" key={props.title}>
        {track}
      </h1>
      <div className="field">
        <label className="label is-large">Track Title</label>
        <div className="control">
          <input
            className="input is-rounded"
            type="text"
            placeholder="Track title..."
            name="title"
            required
            value={track}
            onChange={e => setTrack(e.target.value)}
          />
        </div>
        <label className="label is-large">Genre</label>
        <div className="select">
          <select
            name="genre"
            required
            onChange={e => setGenreInput(e.target.value)}
          >
            <option>Trap</option>
            <option>Pop</option>
            <option>Boom-Bap</option>
            <option>Synthwave</option>
            <option>Lo-fi</option>
          </select>
        </div>
        <label className="label is-large">Mood</label>
        <div className="field has-addons ">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Mood..."
              name="mood"
              value={moodInput}
              onChange={e => setMoodInput(e.target.value)}
            />
          </div>
          <p className="control">
            <button
              onClick={handleAddMoodTag}
              type="button"
              className="button is-primary"
            >
              Add
            </button>
          </p>
        </div>
      </div>
      <div className="field is-grouped is-grouped-multiline">
        {createMoodTags()}
      </div>
      <label className="label is-large">Similar Artists</label>
      <div className="field has-addons ">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Similar Artists..."
            name="similarArtists"
            value={similarArtistsInput}
            onChange={e => setSimilarArtistsInput(e.target.value)}
          />
        </div>
        <p className="control">
          <button
            onClick={handleAddSimilarArtistTag}
            type="button"
            className="button is-primary"
          >
            Add
          </button>
        </p>
      </div>
      <div className="field is-grouped is-grouped-multiline">
        {createSimilarArtistTags()}
      </div>
      <div className="field">
        <label className="label is-large">Public?</label>
        <div className="control">
          <label className="radio is-large">
            <input
              type="radio"
              name="public"
              id="Yes"
              checked={isPublic === 'Yes' ? true : false}
              onChange={handlePublic}
            />
            Yes
          </label>
          <label className="radio">
            <input
              type="radio"
              name="public"
              id="No"
              checked={isPublic === 'No' ? true : false}
              onChange={handlePublic}
            />
            No
          </label>
        </div>
      </div>
      <div className="field">
        <label className="label is-large">Price</label>
        <div className="control">
          <input
            value={price}
            className="input is-rounded"
            type="number"
            placeholder="Name your price..."
            name="price"
            required
            onChange={e => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label is-large">BPM</label>
        <div className="control">
          <input
            value={bpm}
            className="input is-rounded"
            type="number"
            placeholder="BPM.."
            name="BPM"
            required
            onChange={e => setBPM(e.target.value)}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="control">
          <button
            type="submit"
            className={`button is-primary is-medium ${loading}`}
            disabled={disabled}
          >
            Submit
          </button>
        </div>
      </form>
      {submitMessaging()}
    </div>
  );
};

EditForm.defaultProps = {
  presentationTitle: 'Poop',
  similarArtists: ['hi', 'hello'],
}
export default EditForm;

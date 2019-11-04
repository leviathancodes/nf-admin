/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Upload = () => {
  const [fileName, setFileName] = useState('No file uploaded');
  const [submitStatus, setSubmitStatus] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [moodInput, setMoodInput] = useState('');
  const [moodTags, setMoodTags] = useState([]);
  const [genreInput, setGenreInput] = useState('Trap');
  const [track, setTrack] = useState('');
  const [isPublic, setPublic] = useState('No');
  const [price, setPrice] = useState('');
  const [bpm, setBPM] = useState('');
  const [loading, isLoading] = useState('');

  const handlePublic = e => {
    console.log(e.target.id);
    e.target.id === 'Yes' ? setPublic('Yes') : setPublic('No');
  };

  const removeTag = e => {
    let tags = moodTags;
    tags = tags.filter(val => {
      return val !== e.target.innerHTML;
    });
    setMoodTags(tags);
  };

  const createTags = () => {
    if (moodTags) {
      return moodTags.map(tag => {
        return (
          <p key={tag} className="control">
            <button onClick={removeTag} type="button" className="button">
              {tag}
            </button>
          </p>
        );
      });
    }
  };

  const handleAddMoodTag = () => {
    if (moodInput) {
      setMoodTags(moodTags.concat(moodInput));
      setMoodInput('');
    }
  };

  const grabFileName = e => {
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async e => {
    isLoading('is-loading');
    e.preventDefault();
    const data = new FormData(e.target);
    data.append('trackTitle', track);
    data.append('genre', genreInput);
    data.append('mood', moodTags);
    data.append('isPublic', isPublic);
    data.append('price', price);
    data.append('bpm', bpm);
    try {
      const res = await axios.post('http://localhost:5000/music/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSubmitStatus(res.data.status);
      setSubmitMessage(res.data.message);
    } catch (error) {
      if (error.response) {
        setSubmitStatus(error.data.status);
        setSubmitMessage(error.data.message);
      } else if (error.request) {
        setSubmitStatus('error');
        setSubmitMessage(
          `Track upload failed. ${error.message}: Our servers may be offline or undergoing maintanence.`
        );
      } else {
        setSubmitStatus('error');
        setSubmitMessage(`Track upload failed. ${error.message}`);
      }
    }
    isLoading('');
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
      <h1 className="title">Upload a track</h1>
      <div className="field">
        <label className="label is-large">Track Title</label>
        <div className="control">
          <input
            className="input is-rounded"
            type="text"
            placeholder="Track title..."
            name="title"
            required
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
        {createTags()}
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
        <div className="field">
          <div className="file is-medium has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="track"
                accept="audio/*"
                onChange={grabFileName}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="file-label">Choose a file...</span>
              </span>
              <span className="file-name">{fileName}</span>
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className={`button is-primary is-medium ${loading}`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {submitMessaging()}
    </div>
  );
};

export default Upload;

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Upload = () => {
  const [mp3FileName, setMP3FileName] = useState('No file uploaded');
  const [wavFileName, setWavFileName] = useState('No file uploaded');
  const [imageFileName, setImageFileName] = useState('No file uploaded');
  const [trackoutFileName, setTrackOutFileName] = useState('No file uploaded');
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
  const [disabled, isDisabled] = useState(false);
  const [similarArtistsInput, setSimilarArtistsInput] = useState('');
  const [similarArtistsTags, setSimilarArtistsTags] = useState([]);

  const Heading = styled.h1`
    font-size: 3em;
    color: #fa2e6a;
    font-weight: 500;
  `;
  const handlePublic = e => {
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
    if (similarArtistsTags) {
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
    }
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

  const grabFileName = (e, type) => {
    if (type === 'mp3') {
      setMP3FileName(e.target.files[0].name);
    } else if (type === 'wav') {
      setWavFileName(e.target.files[0].name);
    } else if (type === 'trackout') {
      setTrackOutFileName(e.target.files[0].name);
    } else {
      setImageFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async e => {
    isLoading('is-loading');
    isDisabled(true);
    e.preventDefault();
    const data = new FormData(e.target);
    data.append('trackTitle', track);
    data.append('genre', genreInput);
    data.append('mood', moodTags);
    data.append('similarArtists', similarArtistsTags);
    data.append('isPublic', isPublic);
    data.append('price', price);
    data.append('bpm', bpm);
    try {
      const res = await axios.post('/api/music/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 600000,
        onUploadProgress(progressEvent) {
          console.log(
            `${progressEvent.loaded} / ${progressEvent.total} completed.`
          );
        }
      });
      const url = res.data.trackData.mp3Url || res.data.trackData.wavUrl;
      console.log(url);
      const song = new Audio(url);
      song.onloadedmetadata = async () => {
        await axios.patch(
          `/api/music?trackTitle=${track
            .replace(/ /g, '_')
            .toLowerCase()}`,
          { duration: song.duration }
        );
        console.log(song.duration);
        setSubmitStatus(res.data.status);
        setSubmitMessage(res.data.message);
      };
    } catch (error) {
      if (error.response) {
        setSubmitStatus(error.data.status);
        setSubmitMessage(error.data.message);
      } else if (error.request) {
        setSubmitStatus('error');
        setSubmitMessage(
          `Track upload failed. ${error.toJSON()}: Our servers may be offline or undergoing maintanence. ${
            error.status
          }`
        );
      } else {
        console.log(error);
        setSubmitStatus('error');
        setSubmitMessage(`Track upload failed. ${error.message} ${error}`);
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
      <Heading>Upload a track</Heading>
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
            <option>Lo-fi</option>
            <option>Boom-Bap</option>
            <option>Synthwave</option>
            <option>Chillwave</option>
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
              checked={isPublic === 'Yes'}
              onChange={handlePublic}
            />
            Yes
          </label>
          <label className="radio">
            <input
              type="radio"
              name="public"
              id="No"
              checked={isPublic === 'No'}
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
          <label className="label is-large">Cover Art Upload</label>
          <div className="file is-medium has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="cover"
                accept="image/jpeg"
                onChange={e => grabFileName(e)}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="file-label">Upload your cover art...</span>
              </span>
              <span className="file-name">{imageFileName}</span>
            </label>
          </div>
          <label className="label is-large">MP3 Upload</label>
          <div className="file is-medium has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="mp3"
                accept="audio/mp3"
                onChange={e => grabFileName(e, 'mp3')}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="file-label">Upload your track...</span>
              </span>
              <span className="file-name">{mp3FileName}</span>
            </label>
          </div>
          <label className="label is-large">WAV Upload</label>
          <div className="file is-medium has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="wav"
                accept="audio/wav"
                onChange={e => grabFileName(e, 'wav')}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="file-label">Upload your track...</span>
              </span>
              <span className="file-name">{wavFileName}</span>
            </label>
          </div>

          <label className="label is-large">Trackout Upload</label>
          <div className="file is-medium has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="trackout"
                accept="application/zip"
                onChange={e => grabFileName(e, 'trackout')}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="file-label">Upload your trackouts...</span>
              </span>
              <span className="file-name">{trackoutFileName}</span>
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className={`button is-primary is-medium ${loading}`}
              disabled={disabled}
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

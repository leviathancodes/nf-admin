/* eslint-disable consistent-return */
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [fileName, setFileName] = useState('No file uploaded');
  const [submitStatus, setSubmitStatus] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);

  const grabFileName = e => {
    console.log(e.target.files, e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    const res = await axios.post('http://localhost:5000/forumtest', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setSubmitStatus(res.data.status);
    setSubmitMessage(res.data.message);
  };

  const submitMessaging = () => {
    if (!submitStatus && !submitStatus) {
      return;
    }
    const statusClass =
      submitStatus === 'success' ? 'message is-success' : 'message is-danger';
    return (
      <article className={statusClass}>
        <div className="message-body">{submitMessage}</div>
      </article>
    );
  };

  return (
    <div className="container form-container">
      <h1 className="title">Upload a track</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Track Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Track title..."
              name="title"
              required
            />
          </div>
          <label className="label">Genre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Genre..."
              name="genre"
              required
            />
          </div>
          <label className="label">Mood</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Mood..."
              required
              name="mood"
            />
          </div>
        </div>
        <div className="field">
          <div className="file has-name">
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
                  <i />
                </span>
                <span className="file-label">Choose a file...</span>
              </span>
              <span className="file-name">{fileName}</span>
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
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

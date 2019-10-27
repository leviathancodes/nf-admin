import React from 'react';

const Upload = () => {
  return (
    <div className="container form-container">
      <h1 className="title">Upload a track</h1>
      <div className="field">
        <label className="label">Track Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Track title..."
            required
          />
        </div>
        <label className="label">Genre</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Genre..."
            required
          />
        </div>
        <label className="label">Mood</label>
        <div className="control">
          <input className="input" type="text" placeholder="Mood..." required />
        </div>
      </div>
      <div className="field">
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="resume" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload" />
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
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
    </div>
  );
};

export default Upload;

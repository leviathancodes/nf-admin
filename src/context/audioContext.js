import React, { createContext, useState, useEffect } from 'react';

export const AudioContext = createContext();

export const AudioProvider = props => {
  const [audio, setAudio] = useState(new Audio());
  const [trackUrl, setTrackUrl] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const [playList, setPlayList] = useState([]);
  const [title, setTitle] = useState('');
  const [playing, isPlaying] = useState(false);
  const [duration, setDuration] = useState('');
  const [progress, setProgress] = useState('');
  const [volume, setVolume] = useState('');

  const handleSeeking = e => {
    setProgress(e);
    audio.currentTime = e;
  };

  const handlePlaying = async (trackTitle, url) => {
    try {
      if (!currentTrack) {
        audio.src = url;
        audio.oncanplaythrough = () => {
          audio.play();
          setCurrentTrack(trackTitle);
          isPlaying(true);
        };
      }
      audio.play();
      console.info(`Playing ${trackTitle}`);
      isPlaying(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePausing = async () => {
    try {
      console.log(audio);
      audio.pause();
      return isPlaying(false);
    } catch (err) {
      console.log('could not pause');
      return console.log(err);
    }
  };

  const handleStopping = async () => {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      setCurrentTrack('');
      return isPlaying(false);
    } catch (err) {
      console.log('could not stop');
      return console.log(err);
    }
  };

  const handlePlaylist = async () => {};

  const audioState = {
    message: 'hello world',
    audio,
    setAudio,
    playing,
    isPlaying,
    duration,
    setDuration,
    progress,
    setProgress,
    volume,
    setVolume,
    title,
    setTitle,
    currentTrack,
    setCurrentTrack,
    handlePlaying,
    handlePausing,
    handleStopping,
    handleSeeking,
    trackUrl,
    setTrackUrl
  };

  return (
    <AudioContext.Provider value={audioState}>
      {props.children}
    </AudioContext.Provider>
  );
};

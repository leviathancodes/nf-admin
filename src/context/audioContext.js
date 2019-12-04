import React, { createContext, useState, useEffect } from 'react';

export const AudioContext = createContext();

export const AudioProvider = props => {
  const [audio, setAudio] = useState(new Audio());
  const [trackUrl, setTrackUrl] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [playlistActive, setPlaylistActive] = useState(false);
  const [title, setTitle] = useState('');
  const [playing, isPlaying] = useState(false);
  const [progress, setProgress] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);

  const handlePlaying = async (trackTitle, url, trackLength) => {
    try {
      if (!currentTrack) {
        setDuration(trackLength);
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
    console.log('clicked pause');
    try {
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
      setDuration(0);
      setCurrentTrack('');
      return isPlaying(false);
    } catch (err) {
      console.log('could not stop');
      return console.log(err);
    }
  };

  const handleSeeking = e => {
    audio.currentTime = e;
    setProgress(e);
  };

  audio.ontimeupdate = (e) => {
    setProgress(audio.currentTime);
  };

  audio.onended = () => {
    handleStopping();
  };

  audio.volume = volume;

  const handlePlaylist = async () => {};

  const audioState = {
    message: 'Latest tracks',
    audio,
    setAudio,
    playing,
    isPlaying,
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
    playlistActive,
    setPlaylistActive,
    duration,
    setDuration,
    trackUrl,
    setTrackUrl,
    playlist,
    setPlaylist
  };

  return (
    <AudioContext.Provider value={audioState}>
      {props.children}
    </AudioContext.Provider>
  );
};

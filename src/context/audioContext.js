import React, { createContext, useState, useEffect } from 'react';

export const AudioContext = createContext();

export const AudioProvider = props => {
  const [audio, setAudio] = useState(new Audio());
  const [trackUrl, setTrackUrl] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [playlistActive, setPlaylistActive] = useState(false);
  const [title, setTitle] = useState('');
  const [playing, isPlaying] = useState(false);
  const [progress, setProgress] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);

  const handlePlaying = async (trackTitle, url, trackLength) => {
    try {
      if (!currentTrack || (trackTitle && currentTrack !== trackTitle)) {
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
      console.log('could not play')
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

  audio.ontimeupdate = () => {
    setProgress(audio.currentTime);
  };

  audio.onended = () => {
    if (!playlist) {
      handleStopping();
    }
    console.log('playing next track');
    playlist.forEach((track, i) => {
      if (track.presentationTitle === currentTrack) {
        handleStopping();
        const nextTrack = playlist[i + 1];
        handlePlaying(nextTrack.presentationTitle, nextTrack.trackUrl, nextTrack.duration);
      }
    });
  };

  audio.volume = volume;

  const handlePlaylist = async () => {};

  // Fisher-Yates Algorithm for shuffling / randomizing
  const handleShuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
    return setShuffledPlaylist(array);
  };

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
    handleShuffle,
    shuffledPlaylist,
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

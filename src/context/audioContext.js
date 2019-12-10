import React, { createContext, useState, useEffect } from 'react';

export const AudioContext = createContext();

export const AudioProvider = props => {
  const [audio, setAudio] = useState(new Audio());
  const [trackUrl, setTrackUrl] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [playlistActive, setPlaylistActive] = useState(false);
  const [playing, isPlaying] = useState(false);
  const [progress, setProgress] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);

  const handlePlaying = async (trackTitle, url, trackLength) => {
    try {
      if (!currentTrack && !url) {
        return console.log('no song selected');
      }
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
      console.log('could not play');
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

  const handleNextTrack = title => {
    if (currentTrack) {
      playlist.forEach((track, i) => {
        if (track.presentationTitle === title) {
          if (i === playlist.length - 1) {
            audio.src = '';
            return handleStopping();
          }
          const nextTrack = playlist[i + 1];
          return handlePlaying(
            nextTrack.presentationTitle,
            nextTrack.trackUrl,
            nextTrack.duration
          );
        }
      });
    }
  };

  const handlePreviousTrack = title => {
    if (currentTrack) {
      if (title === playlist[0].presentationTitle) {
        audio.src = '';
        return handleStopping();
      }
      playlist.forEach((track, i) => {
        if (track.presentationTitle === title) {
          const nextTrack = playlist[i - 1];
          return handlePlaying(
            nextTrack.presentationTitle,
            nextTrack.trackUrl,
            nextTrack.duration
          );
        }
      });
    }
  };

  audio.ontimeupdate = () => {
    setProgress(audio.currentTime);
  };

  audio.onended = () => {
    if (
      !playlist ||
      currentTrack === playlist[playlist.length - 1].presentationTitle
    ) {
      handleStopping();
    }
    console.log('playing next track');
    return handleNextTrack(currentTrack);
  };

  audio.volume = volume;

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
    handleNextTrack,
    handlePreviousTrack,
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

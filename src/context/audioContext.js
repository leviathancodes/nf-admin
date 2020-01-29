import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'underscore';
import { UserContext } from './userContext';

export const AudioContext = createContext();

export const AudioProvider = props => {
  const [audio, setAudio] = useState(new Audio());
  const [trackUrl, setTrackUrl] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [shuffled, setShuffled] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(false);
  const [playlistActive, setPlaylistActive] = useState(false);
  const [playing, isPlaying] = useState(false);
  const [progress, setProgress] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [footerVisibility, setFooterVisibility] = useState('auto');

  const { user, setUser } = useContext(UserContext);

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
          return isPlaying(true);
        };
      }
      audio.play();
      console.info(`Playing ${trackTitle}`);
      return isPlaying(true);
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
      const list = shuffled ? shuffledPlaylist : playlist;
      list.forEach((track, i) => {
        if (track.presentationTitle === title) {
          if (i === list.length - 1) {
            audio.src = '';
            return handleStopping();
          }
          const nextTrack = list[i + 1];
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
      const list = shuffled ? shuffledPlaylist : playlist;
      if (title === list[0].presentationTitle) {
        audio.src = '';
        return handleStopping();
      }
      list.forEach((track, i) => {
        if (track.presentationTitle === title) {
          const nextTrack = list[i - 1];
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

  const handleShuffle = arr => {
    if (!shuffled) {
      const array = _.shuffle(arr);
      setShuffled(true);
      return setShuffledPlaylist(array);
    }
    setShuffled(false);
  };

  const handleLiking = async trackId => {
    if (user) {
      try {
        if (user.likedTracks.includes(trackId)) {
          const res = await axios.delete(
            `http://localhost:5000/user/music/like?id=${user.id}&trackId=${trackId}`
          );
          const updateUser = await axios.get(
            `http://localhost:5000/user?id=${user.id}`
          );
          setUser(updateUser.data);
          return [res.data, 'remove'];
        }
        const res = await axios.patch(
          `http://localhost:5000/user/music/like?id=${user.id}&trackId=${trackId}`
        );
        const updateUser = await axios.get(
          `http://localhost:5000/user?id=${user.id}`
        );
        setUser(updateUser.data);
        return [res.data, 'add'];
      } catch (e) {
        console.log('You failed');
      }
    }
    return console.log('Log in');
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
    setShuffledPlaylist,
    shuffled,
    playlistActive,
    setPlaylistActive,
    handleNextTrack,
    handlePreviousTrack,
    duration,
    setDuration,
    trackUrl,
    setTrackUrl,
    playlist,
    setPlaylist,
    footerVisibility,
    setFooterVisibility,
    handleLiking
  };

  return (
    <AudioContext.Provider value={audioState}>
      {props.children}
    </AudioContext.Provider>
  );
};

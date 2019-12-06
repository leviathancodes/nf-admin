import { useContext } from 'react';
import { AudioContext } from '../context/audioContext';

const context = useContext(AudioContext);

const handlePlaying = (trackTitle, trackUrl, duration) => {
  if (!context.currentTrack) {
    return context.handlePlaying(trackTitle, trackUrl, duration);
  }
  if (context.playing && context.currentTrack !== trackTitle) {
    context.handleStopping();
    return context.handlePlaying(trackTitle, trackUrl, duration);
  }

  if (context.playing) {
    return context.handlePausing(trackTitle, trackUrl);
  }
  if (context.currentTrack !== trackTitle) {
    context.handleStopping();
    return context.handlePlaying(trackTitle, trackUrl, duration);
  }
  return context.handlePlaying(trackTitle, trackUrl, duration);
};

export default handlePlaying;
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Pause, Play } from 'react-feather';

export interface AudioMessageProps {
  url?: string,
}

/**
 * A component to display an audio message.
 */
export default function AudioMessage(props: AudioMessageProps) {
  const { url } = props;
  const [playing, setIsPlaying] = useState(false);
  const [playOffset, setPlayOffset] = useState(0);
  const ref = useRef<HTMLAudioElement>(null);
  const onPlayPauseButtonClicked = useCallback(() => {
    setIsPlaying(!playing);
  }, [playing]);
  useEffect(() => {
    if (playing) {
      ref.current?.play().then();
    } else {
      ref.current?.pause();
    }
  }, [playing]);
  const onTimeUpdate: React.ReactEventHandler<HTMLAudioElement> = useCallback(() => {
    if (ref.current) {
      setPlayOffset(ref.current.currentTime / ref.current.duration);
    }
  }, [ref]);
  const onEnded = useCallback(() => {
    setIsPlaying(false);
    setPlayOffset(0);
  }, []);
  return (
    <div className="audio chat-content">
      <div className="d-flex flex-row px-1 align-items-center audio-controls w-100">
        {
          playing ? (
            <Pause onClick={onPlayPauseButtonClicked} size={16} />
          ) : (
            <Play onClick={onPlayPauseButtonClicked} size={16} />
          )
        }
        <div className="audio-timeline">
          <div className="audio-thumb" style={{ left: `${playOffset * 100}%` }} />
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio className="hidden" ref={ref} controls onTimeUpdate={onTimeUpdate} onEnded={onEnded}>
        <source src={url} />
      </audio>
    </div>
  );
}

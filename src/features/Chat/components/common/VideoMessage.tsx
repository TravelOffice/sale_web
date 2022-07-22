import React, { CSSProperties } from 'react';

export interface VideoMessageProps {
  width?: number,
  height?: number,
  url?: string,
  autoplay?: boolean,
  controls?: boolean,
  loop?: boolean,
}

/**
 * Component to display a video message
 * @param props
 * @constructor
 */
export default function VideoMessage(props: VideoMessageProps) {
  const {
    width, height, url, autoplay = false, controls = true, loop = false,
  } = props;
  const styles: CSSProperties = { maxWidth: '40%' };
  if (width && height && width < height) {
    styles.maxWidth = '20%';
  }
  return (
    <div style={styles} className="video chat-content">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video controls={controls} autoPlay={autoplay} loop={loop}>
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
}

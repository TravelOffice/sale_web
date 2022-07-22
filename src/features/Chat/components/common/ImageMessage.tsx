import React, { CSSProperties } from 'react';

export interface ImageMessageProps extends React.HTMLAttributes<HTMLImageElement> {
  alt?: string,
  url?: string,
  width?: number,
  height?: number,
}

/**
 * Component to display an image message
 * @param props
 * @constructor
 */
export default function ImageMessage(props: ImageMessageProps) {
  const {
    width, height, alt, url,
  } = props;
  const styles: CSSProperties = {};
  if (width && height && width < height) {
    // For portrait image, it may display too large to view inside the chat window.
    // This leads the user have to scroll to view a part of image. It's inconvenience for
    // the user. Scale out it to solve this problem.
    styles.maxWidth = '20%';
  }
  return (
    <div>
      <img style={styles} className="chat-content cursor-pointer" src={url} alt={alt} />
    </div>
  );
}

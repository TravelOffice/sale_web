import React from 'react';
import { FileText } from 'react-feather';

export interface FileMessageProps {
  url?: string,
  fileName?: string,
}

/**
 * Component to display a file message
 * @param props
 * @constructor
 */
export default function FileMessage(props: FileMessageProps) {
  const { url, fileName } = props;
  return (
    <div className="chat-content">
      <p>
        <FileText size={16} />
        {' '}
        <a href={url} target="_blank" rel="noreferrer">{fileName}</a>
      </p>
    </div>
  );
}

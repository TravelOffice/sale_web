import React from 'react';
import { FileText } from 'react-feather';

export interface DocumentMessageProps {
  url: string,
  fileName?: string,
}

/**
 * Component to display a document message (docx, pptx, xlsx,...)
 */
export default function DocumentMessage(props: DocumentMessageProps) {
  const { url, fileName } = props;
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}`;
  return (
    <div className="chat-content">
      <p>
        <FileText size={16} />
        {' '}
        <a href={viewerUrl} target="_blank" rel="noreferrer">{fileName}</a>
      </p>
    </div>
  );
}

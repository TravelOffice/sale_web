import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';

// eslint-disable-next-line import/prefer-default-export
export function stringToEditorState(value?: string) {
  // Convert the HTML string to Draft.js content
  const contentBlock = htmlToDraft(value || '').contentBlocks;
  const contentState = ContentState.createFromBlockArray(contentBlock);
  return EditorState.createWithContent(contentState);
}

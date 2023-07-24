export const noteTypes = ['CALL', 'EMAIL', 'SMS', 'ZALO', 'OTHERS'] as const;
export type NoteType = typeof noteTypes[number];

export interface Note {
  id: string,
  title: string,
  description: string,
  type: NoteType,
  createdAt: number,
  updatedAt: number,
  creatorId: string,
  creatorName: string,
}

export type CreateNoteFormData = Pick<Note, 'title' | 'description' | 'type'>;

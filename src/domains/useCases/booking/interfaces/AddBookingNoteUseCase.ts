import { CreateNoteFormData, Note } from '@domain/entities/note/Note';

export interface AddBookingNoteUseCase {
  invoke: (bookingId: string, formData: CreateNoteFormData) => Promise<Note>,
}

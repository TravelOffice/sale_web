import { AddBookingNoteUseCase } from '@domain/useCases/booking/interfaces/AddBookingNoteUseCase';
import { CreateNoteFormData } from '@domain/entities/note/Note';
import { bookingRepository } from '@adapter/repositories';

export default class AddBookingNoteUseCaseImpl implements AddBookingNoteUseCase {
  invoke = async (
    bookingId: string,
    formData: CreateNoteFormData,
  ) => bookingRepository.addNote(bookingId, formData)
}

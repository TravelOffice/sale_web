import { AddBookingUseCase } from '@domain/useCases/booking/interfaces/AddBookingUseCase';
import { AddBookingFromLeadUseCase } from '@domain/useCases/booking/interfaces/AddBookingFromLeadUseCase';
import { GetBookingUseCase } from '@domain/useCases/booking/interfaces/GetBookingUseCase';
import { GetBookingsUseCase } from '@domain/useCases/booking/interfaces/GetBookingsUseCase';
import { UpdateBookingUseCase } from '@domain/useCases/booking/interfaces/UpdateBookingUseCase';
import { ChangeBookingStatusUseCase } from '@domain/useCases/booking/interfaces/ChangeBookingStatusUseCase';
import ChangeBookingStatusUseCaseImpl from '@domain/useCases/booking/ChangeBookingStatusUseCaseImpl';
import UpdateBookingUseCaseImpl from '@domain/useCases/booking/UpdateBookingUseCaseImpl';
import GetBookingsUseCaseImpl from '@domain/useCases/booking/GetBookingsUseCaseImpl';
import GetBookingUseCaseImpl from '@domain/useCases/booking/GetBookingUseCaseImpl';
import AddBookingFromLeadUseCaseImpl from '@domain/useCases/booking/AddBookingFromLeadUseCaseImpl';
import AddBookingUseCaseImpl from '@domain/useCases/booking/AddBookingUseCaseImpl';
import { AddBookingNoteUseCase } from '@domain/useCases/booking/interfaces/AddBookingNoteUseCase';
import AddBookingNoteUseCaseImpl from '@domain/useCases/booking/AddBookingNoteUseCaseImpl';

interface UseCases {
  addBookingUseCase: AddBookingUseCase,
  addBookingFromLeadUseCase: AddBookingFromLeadUseCase,
  getBookingUseCase: GetBookingUseCase,
  getBookingsUseCase: GetBookingsUseCase,
  updateBookingUseCase: UpdateBookingUseCase,
  changeBookingStatusUseCase: ChangeBookingStatusUseCase,
  addBookingNoteUseCase: AddBookingNoteUseCase,
}

const useCases: UseCases = {
  addBookingUseCase: new AddBookingUseCaseImpl(),
  addBookingFromLeadUseCase: new AddBookingFromLeadUseCaseImpl(),
  getBookingUseCase: new GetBookingUseCaseImpl(),
  getBookingsUseCase: new GetBookingsUseCaseImpl(),
  updateBookingUseCase: new UpdateBookingUseCaseImpl(),
  changeBookingStatusUseCase: new ChangeBookingStatusUseCaseImpl(),
  addBookingNoteUseCase: new AddBookingNoteUseCaseImpl(),
};

export const {
  addBookingUseCase,
  addBookingFromLeadUseCase,
  getBookingUseCase,
  getBookingsUseCase,
  updateBookingUseCase,
  changeBookingStatusUseCase,
  addBookingNoteUseCase,
} = useCases;

import { GetAllSourceUseCase } from '@domain/useCases/interfaces/GetAllSourceUseCase';
import { GetSourceUseCase } from '@domain/useCases/interfaces/GetSourceUseCase';
import { CreateSourceUseCase } from '@domain/useCases/interfaces/CreateSourceUseCase';
import { UpdateSourceUseCase } from '@domain/useCases/interfaces/UpdateSourceUseCase';
import { DeleteSourceUseCase } from '@domain/useCases/interfaces/DeleteSourceUseCase';
import GetAllSourceUseCaseImpl from '@domain/useCases/source/GetAllSourceUseCaseImpl';
import GetSourceUseCaseImpl from '@domain/useCases/source/GetSourceUseCaseImpl';
import CreateSourceUseCaseImpl from '@domain/useCases/source/CreateSourceUseCaseImpl';
import UpdateSourceUseCaseImpl from '@domain/useCases/source/UpdateSourceUseCaseImpl';
import DeleteSourceUseCaseImpl from '@domain/useCases/source/DeleteSourceUseCaseImpl';

interface SourceUseCases {
  getAllSourceUseCase: GetAllSourceUseCase,
  getSourceUseCase: GetSourceUseCase,
  createSourceUseCase: CreateSourceUseCase,
  updateSourceUseCase: UpdateSourceUseCase,
  deleteSourceUseCase: DeleteSourceUseCase,
}

const useCases: SourceUseCases = {
  getAllSourceUseCase: new GetAllSourceUseCaseImpl(),
  getSourceUseCase: new GetSourceUseCaseImpl(),
  createSourceUseCase: new CreateSourceUseCaseImpl(),
  updateSourceUseCase: new UpdateSourceUseCaseImpl(),
  deleteSourceUseCase: new DeleteSourceUseCaseImpl(),
};

export const {
  getAllSourceUseCase,
  getSourceUseCase,
  createSourceUseCase,
  updateSourceUseCase,
  deleteSourceUseCase,
} = useCases;

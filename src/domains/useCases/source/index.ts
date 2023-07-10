import { GetAllSourcesUseCase } from '@domain/useCases/interfaces/source/GetAllSourcesUseCase';
import { GetSourceUseCase } from '@domain/useCases/interfaces/source/GetSourceUseCase';
import { CreateSourceUseCase } from '@domain/useCases/interfaces/source/CreateSourceUseCase';
import { UpdateSourceUseCase } from '@domain/useCases/interfaces/source/UpdateSourceUseCase';
import { DeleteSourceUseCase } from '@domain/useCases/interfaces/source/DeleteSourceUseCase';
import GetSourceUseCaseImpl from '@domain/useCases/source/GetSourceUseCaseImpl';
import CreateSourceUseCaseImpl from '@domain/useCases/source/CreateSourceUseCaseImpl';
import UpdateSourceUseCaseImpl from '@domain/useCases/source/UpdateSourceUseCaseImpl';
import DeleteSourceUseCaseImpl from '@domain/useCases/source/DeleteSourceUseCaseImpl';
import GetAllSourcesUseCaseImpl from './GetAllSourcesUseCaseImpl';

interface SourceUseCases {
  getAllSourceUseCase: GetAllSourcesUseCase,
  getSourceUseCase: GetSourceUseCase,
  createSourceUseCase: CreateSourceUseCase,
  updateSourceUseCase: UpdateSourceUseCase,
  deleteSourceUseCase: DeleteSourceUseCase,
}

const useCases: SourceUseCases = {
  getAllSourceUseCase: new GetAllSourcesUseCaseImpl(),
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

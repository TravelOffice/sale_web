import { ChangeOperationStatusUseCase } from '@domain/useCases/tour/interfaces/ChangeOperationStatusUseCase';
import ChangeOperationStatusUseCaseImpl from '@domain/useCases/tour/ChangeOperationStatusUseCaseImpl';

interface UseCases {
  changeOperationStatusUseCase: ChangeOperationStatusUseCase,
}

const useCases: UseCases = {
  changeOperationStatusUseCase: new ChangeOperationStatusUseCaseImpl(),
};

// eslint-disable-next-line import/prefer-default-export
export const {
  changeOperationStatusUseCase,
} = useCases;

import { UseFormReturn } from 'react-hook-form';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';

export interface ConfigureMailAccountStepProps<T = any> {
  form: UseFormReturn<LinkEmailFormData>,
  onNext: (data?: T) => void,
}

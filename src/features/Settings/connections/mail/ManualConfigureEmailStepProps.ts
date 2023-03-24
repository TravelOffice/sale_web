import { UseFormReturn } from 'react-hook-form';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import Stepper from '@utils/Stepper';

export interface ManualConfigureEmailStepProps {
  form: UseFormReturn<LinkEmailFormData>,
  stepper: Stepper
}

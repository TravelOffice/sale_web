import { useQuery } from '@tanstack/react-query';
import { tourTemplatePresenter } from '@adapter/presenters';
import { useMemo } from 'react';

export function useTourTemplates() {
  return useQuery(['tour-templates'], tourTemplatePresenter.getAllTourTemplates);
}

export function useTourTemplateOptions() {
  const { data: tourTemplates } = useTourTemplates();
  return useMemo(() => {
    if (!tourTemplates) return [];
    return tourTemplates.map((tourTemplate) => ({
      label: tourTemplate.name,
      value: tourTemplate.code,
    }));
  }, [tourTemplates]);
}

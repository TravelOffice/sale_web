export type TourLocationType = 'ENABLE' | 'DISABLE';

export interface TourLocation {
  name: string,
  code: string,
  status: TourLocationType,
}

export type CreateTourLocationFormData = Pick<TourLocation, 'name' | 'status'>;

export type UpdateTourLocationFormData = CreateTourLocationFormData;

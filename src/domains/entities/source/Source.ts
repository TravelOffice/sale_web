export interface Source {
  code: string,
  name: string,
}

export type CreateSourceFormData = Pick<Source, 'name'>;

export type UpdateSourceFormData = CreateSourceFormData;

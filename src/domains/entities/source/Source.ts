export interface Source {
  code: string,
  name: string,
  createdAt: number,
  updatedAt: number,
}

export type CreateSourceFormData = Pick<Source, 'name'>;

export type UpdateSourceFormData = CreateSourceFormData;

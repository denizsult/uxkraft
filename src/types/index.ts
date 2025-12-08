export * from './item';

export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Meta = {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: Meta;
};



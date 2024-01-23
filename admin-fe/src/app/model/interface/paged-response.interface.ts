export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  data: T[];
}

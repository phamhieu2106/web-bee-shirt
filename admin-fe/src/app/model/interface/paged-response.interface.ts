export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  pageNumberArr: number[];
  totalElements: number;
  data: T[];
  search: string;
}

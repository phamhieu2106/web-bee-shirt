export interface FilterSPCTParams {
  pageNumber: number;
  pageSize: number;
  minPrice: number;
  maxPrice: number;
  productId: number;
  colorId: string;
  sizeId: string;
  formId: string;
  designId: string;
  sleeveId: string;
  collarId: string;
  materialId: string;

  [key: string]: any;
}

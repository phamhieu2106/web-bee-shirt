export interface AddSpctValidation {
  propertyError: boolean;
  priceQuantityError: boolean;
  kieuDangId: boolean;
  thietKeId: boolean;
  tayAoId: boolean;
  coAoId: boolean;
  chatLieuId: boolean;
  priceQuantity: boolean[];
  anh: boolean[];
  [key: string]: boolean | boolean[];
}

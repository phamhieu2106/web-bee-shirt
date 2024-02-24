import { AddSPCTSubRequest } from "./add-spct-sub-request.interface";

export interface AddSPCTRequest {
  id: number;
  giaNhap: number;
  giaBan: number;
  sanPhamId: number;
  kieuDangId: number;
  thietKeId: number;
  tayAoId: number;
  coAoId: number;
  chatLieuId: number;
  requests: AddSPCTSubRequest;
}

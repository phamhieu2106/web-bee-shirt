import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HinhAnh } from "../model/class/hinh-anh.class";

@Injectable({
  providedIn: "root",
})
export class HinhAnhSanPhamService {
  private readonly apiURL = "http://localhost:8080/hinh-anh-sp";

  constructor(private http: HttpClient) {}

  public getAll(tenMau: string, sanPhamID: number): Observable<HinhAnh[]> {
    let params = `?tenMau=${tenMau}&sanPhamID=${sanPhamID}`;
    return this.http.get<HinhAnh[]>(`${this.apiURL}/get-by-ms${params}`);
  }

  public getImgsOf1ProductColor(
    prodId: number,
    colorId: number
  ): Observable<HinhAnh[]> {
    return this.http.get<HinhAnh[]>(
      `${this.apiURL}/by-product-color/${prodId}/${colorId}`
    );
  }
}

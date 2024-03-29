import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductImageService {
  private readonly apiUrl = "http://localhost:8080/hinh-anh-sp";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllUrlBySanPhamAndMauSac(
    productId: number,
    colorId: number
  ): Observable<String[]> {
    return this.http.get<String[]>(
      `${this.apiUrl}/url-by-sp-ms/${productId}/${colorId}`
    );
  }
}

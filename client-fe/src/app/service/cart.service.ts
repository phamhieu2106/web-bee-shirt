import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartItemService {
  private readonly apiUrl = "http://localhost:8080/cart-item";

  public totalCartItems = new BehaviorSubject<number>(0);

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public setQuantity(value: number): void {
    this.totalCartItems.next(value);
  }

  // 2
  public getCartItemsByUserId(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/get-by-user/${userId}`);
  }
}

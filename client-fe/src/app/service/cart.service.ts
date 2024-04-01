import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CartItem } from "../model/class/cart-item.class";

@Injectable({
  providedIn: "root",
})
export class CartItemService {
  private readonly apiUrl = "http://localhost:8080/cart-item";

  public totalCartItems = new BehaviorSubject<number>(0);
  public cartItemsInLocalStorage = new BehaviorSubject<CartItem[]>([]);
  public cartItemsInLocalStorageQuantity = new BehaviorSubject<number>(0);

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // public functions
  // 1
  public setQuantity(value: number): void {
    this.totalCartItems.next(value);
  }

  // 2
  public getCartItemsByUserId(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/get-by-user/${userId}`);
  }

  // 3
  public addCartItemToLocalStorage(cartItem: CartItem): void {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    this.cartItemsInLocalStorage.next(cartItems);
    this.cartItemsInLocalStorageQuantity.next(cartItems.length);
  }
}

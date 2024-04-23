import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CartItem } from "../model/class/cart-item.class";
import { AddCartItemReq } from "../model/interface/add-cart-item-req.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly apiUrl = "http://localhost:8080/cart";

  public cartItemsOfLoggedUser = new BehaviorSubject<CartItem[]>([]);
  public cartItemsQuantityOfLoggedUser = new BehaviorSubject<number>(0);

  public cartItemsInLocalStorage = new BehaviorSubject<CartItem[]>([]);
  public cartItemsQuantityInLocalStorage = new BehaviorSubject<number>(0);

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // public functions
  // 1
  public addCartItemToLocalStorage(cartItem: CartItem): void {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    this.cartItemsInLocalStorage.next(cartItems);
    this.cartItemsQuantityInLocalStorage.next(cartItems.length);
  }

  // 2
  public updateCartItemsInStorage(cartItems: CartItem[]): void {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.cartItemsInLocalStorage.next(cartItems);
  }

  public updateCartItemsQuantityInStorage(quantity: number): void {
    this.cartItemsQuantityInLocalStorage.next(quantity);
  }

  // 4
  public getCartItemsOfLoggedCustomer(cusId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      `${this.apiUrl}/items/by-customer/${cusId}`
    );
  }

  // 5
  public getCartItemByCustomerAndProductDetails(
    cusId: number,
    proDetailsId: number
  ): Observable<CartItem> {
    return this.http.get<CartItem>(
      `${this.apiUrl}/items/by-cus-details/${cusId}/${proDetailsId}`
    );
  }

  // 6
  public addCartItemForLoggedCus(req: AddCartItemReq): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/items/add-cart-item`, req);
  }

  // 7
  public minusOrPlusCartItemQuantity(
    cartItemId: number,
    type: string
  ): Observable<CartItem> {
    return this.http.get<CartItem>(
      `${this.apiUrl}/items/minus-plus-quantity/${cartItemId}/${type}`
    );
  }

  // 7
  public updateCartItemQuantity(
    cartItemId: number,
    newQuantity: number
  ): Observable<CartItem> {
    return this.http.get<CartItem>(
      `${this.apiUrl}/items/update-quantity/${cartItemId}/${newQuantity}`
    );
  }

  // 8
  public deleteItemFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/delete/${cartItemId}`);
  }

  // 9
  public updateCartItemsOfLoggedUser(cartItems: CartItem[]): void {
    this.cartItemsOfLoggedUser.next(cartItems);
  }

  // 10
  public updateCartItemsQuantityOfLoggedUser(quantity: number): void {
    this.cartItemsQuantityOfLoggedUser.next(quantity);
  }
}

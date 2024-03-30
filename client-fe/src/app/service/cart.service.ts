import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly apiUrl = "http://localhost:8080/mau-sac";

  public totalCartItems = new BehaviorSubject<number>(0);

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public setQuantity(value: number): void {
    this.totalCartItems.next(value);
  }
}

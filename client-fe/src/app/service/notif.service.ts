import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Notification } from "../model/class/notification.class";

@Injectable({
  providedIn: "root",
})
export class NotifService {
  private readonly apiUrl = "http://localhost:8080/api/notification";

  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllByCust(custId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.apiUrl}/all-by-cust/${custId}`
    );
  }

  // 2
  public setIsRead(notifId: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}/set-read/${notifId}`);
  }
}

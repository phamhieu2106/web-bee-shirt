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

  // 1
  public createNewNotification(notification: Notification): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, notification);
  }

  // 2
  public getAllNotifOfStaff(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notif-of-staff`);
  }

  // 3
  public setIsRead(notifId: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}/set-read/${notifId}`);
  }
}

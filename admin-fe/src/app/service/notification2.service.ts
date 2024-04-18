import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Notification } from "../model/class/notification.class";

@Injectable({
  providedIn: "root",
})
export class NotificationService2 {
  url = "http://localhost:8080/api/notification";

  constructor(private http: HttpClient) {}

  post(notification: Notification) {
    return this.http.post(this.url, notification);
  }
}

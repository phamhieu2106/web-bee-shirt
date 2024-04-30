import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";

import { Notification } from "src/app/model/class/notification.class";
import { NotifService } from "src/app/service/notif.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-main-heading",
  templateUrl: "./main-heading.component.html",
  styleUrls: ["./main-heading.component.css"],
})
export class MainHeadingComponent {
  @Input() mainHeading: string;
  @Input() title: string;
  @Input() icon: string;
  public isNoticesShow: boolean = false;
  private webSocket!: WebSocket;
  public notifications: Notification[] = [];
  public unreadNotifQuantity: number;

  // constructor, ngOn
  constructor(
    private notifService: NotificationService,
    private notifService2: NotifService
  ) {}

  ngOnInit() {
    this.openWebSocket();
    this.getAllNotifications();
  }

  // public functions
  // 1
  public toggleNotices(): void {
    this.isNoticesShow = !this.isNoticesShow;
  }

  // 2
  public setIsRead(notifId: number): void {
    this.notifService2.setIsRead(notifId).subscribe({
      next: (notif: Notification) => {
        this.notifications = this.notifications.map((item: Notification) => {
          if (item.id === notif.id) {
            item.read = notif.read;
            return item;
          }
          return item;
        });
        this.getAllNotifications();
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notifService.error(errorRes.error.message);
      },
    });
  }

  // private functions
  // 1
  private openWebSocket(): void {
    this.webSocket = new WebSocket("ws://localhost:8080/notification2");
    this.webSocket.onopen = (event) => {};
    this.webSocket.onmessage = (event) => {
      this.notifService.success(event.data as string);
      this.notifService2.getAllNotifOfStaff().subscribe({
        next: (notificationsResp: Notification[]) => {
          this.notifications = notificationsResp;
          this.countUnreadNotifications(this.notifications);
        },
        error: (errResp: HttpErrorResponse) => {
          this.notifService.error(errResp.error.message);
        },
      });
    };
    this.webSocket.onclose = (event) => {};
  }

  // 2
  private getAllNotifications(): void {
    this.notifService2.getAllNotifOfStaff().subscribe({
      next: (notificationsResp: Notification[]) => {
        this.notifications = notificationsResp;
        this.countUnreadNotifications(this.notifications);
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 3
  private countUnreadNotifications(notifications: Notification[]): void {
    let count = 0;
    for (const notification of notifications) {
      if (!notification.read) {
        count += 1;
      }
    }
    this.unreadNotifQuantity = count;
  }
}

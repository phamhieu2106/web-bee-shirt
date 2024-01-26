import { Component, Input } from "@angular/core";

@Component({
  selector: "app-order-history-payment",
  templateUrl: "./order-history-payment.component.html",
  styleUrls: ["./order-history-payment.component.css"],
})
export class OrderHistoryPaymentComponent {
  @Input() lichSuThanhToans: any;
}

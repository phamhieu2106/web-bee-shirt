import { Component, Input } from "@angular/core";
import { ThanhToan } from "src/app/model/class/thanh-toan";

@Component({
  selector: "app-order-history-payment",
  templateUrl: "./order-history-payment.component.html",
  styleUrls: ["./order-history-payment.component.css"],
})
export class OrderHistoryPaymentComponent {
  @Input({ required: true }) thanhToans: ThanhToan[];
}

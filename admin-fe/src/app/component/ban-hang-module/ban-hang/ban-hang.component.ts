import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { Component } from "@angular/core";

@Component({
  selector: "app-ban-hang",
  templateUrl: "./ban-hang.component.html",
  styleUrls: ["./ban-hang.component.css"],
})
export class BanHangComponent {
  public diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
}

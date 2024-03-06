import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";

@Component({
  selector: "app-giao-hang",
  templateUrl: "./giao-hang.component.html",
  styleUrls: ["./giao-hang.component.css"],
})
export class GiaoHangComponent implements OnInit, OnChanges {
  @Input() khachHang: KhachHang; // từ khách hàng lấy ra được danh sách địa chỉ
  @Output() changePhiVanChuyen = new EventEmitter<number>();
  public diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["khachHang"]) {
      console.log("Change khachHang");
    }
  }
  ngOnInit(): void {}
  updatePhiVanChuyen(soTien: number) {
    console.log(soTien);
  }
}

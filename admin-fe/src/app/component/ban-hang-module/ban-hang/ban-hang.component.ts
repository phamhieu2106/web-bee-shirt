import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { Component, OnInit } from "@angular/core";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";

@Component({
  selector: "app-ban-hang",
  templateUrl: "./ban-hang.component.html",
  styleUrls: ["./ban-hang.component.css"],
})
export class BanHangComponent implements OnInit {
  public diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
  orders = new Array<HoaDon>();
  khachHangs: KhachHang[];
  order: HoaDon;
  spcts: SanPhamChiTiet[];
  search = "";

  constructor(
    private toast: ToastrService,
    private spctService: SanPhamChiTietService
  ) {}
  ngOnInit(): void {
    if (this.orders.length == 0) {
      this.newHoaDon();
    }
    this.getAllSpct();
  }

  changeHoaDon(index: number) {
    this.order = this.orders[index];
  }

  newHoaDon() {
    if (this.orders.length >= 5) {
      this.toast.info("Bạn chỉ có thể tạo tối đa 5 đơn hàng");
      return;
    }
    let hoaDon = new HoaDon();
    let orderNameTemp = this.newOrderNameTemp();
    // set default value
    hoaDon.orderNameTemp = orderNameTemp;
    hoaDon.tongTien = 0;
    hoaDon.tienGiam = 0;
    hoaDon.phiVanChuyen = 0;
    hoaDon.loaiHoaDon = "TAI_QUAY"; // TAI_QUAY or GIAO_HANG

    this.orders.push(hoaDon);
    this.order = hoaDon;
  }

  deleteOrder(index: number) {
    if (this.orders.length == 1) {
      return;
    }
    this.orders.splice(index, 1);
    this.order = this.orders[index - 1];
  }

  newOrderNameTemp(): string {
    // Lấy ra đối tượng cuối cùng của key
    const lastOrder = this.orders[this.orders.length - 1];
    if (lastOrder === undefined) {
      return "Đơn 1";
    }
    // Lấy ra key của đối tượng đã lấy
    const lastKey: string = lastOrder.orderNameTemp;
    // Lấy ra chỉ số cuối cùng của key
    let indexOfKey: number = parseInt(lastKey.split(" ")[1]);
    // Tạo key mới với chỉ số + 1
    return "Đơn " + (indexOfKey + 1);
  }
  changeLoaiHoaDon(event: any) {
    if (event.target.checked) {
      this.order.loaiHoaDon = "GIAO_HANG";
    } else {
      this.order.loaiHoaDon = "TAI_QUAY";
    }
  }

  chooseKhachHang(khachHang: KhachHang) {
    this.order.khachHang = new KhachHang();
  }

  removeKhachHangInOrder() {
    this.order.khachHang = null;
  }

  getAllSpct() {
    console.log(this.search);

    this.spctService.getAll(1, 10, this.search).subscribe({
      next: (resp) => {
        this.spcts = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

import { BanHangService } from "./../../../service/ban-hang.service";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { Component, OnInit } from "@angular/core";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { KhachHangService } from "src/app/service/khach-hang.service";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import Swal from "sweetalert2";

@Component({
  selector: "app-ban-hang",
  templateUrl: "./ban-hang.component.html",
  styleUrls: ["./ban-hang.component.css"],
})
export class BanHangComponent implements OnInit {
  phiVanChuyenTemp: number;
  orders = new Array<HoaDon>();
  khachHangs: KhachHang[];
  order: HoaDon;
  spcts: SanPhamChiTiet[];
  searchProduct = "";
  searchKhachHang = "";

  constructor(
    private toast: ToastrService,
    private spctService: SanPhamChiTietService,
    private khachHangService: KhachHangService,
    private banHangService: BanHangService
  ) {}

  ngOnInit(): void {
    if (this.orders.length == 0) {
      this.newHoaDon();
    }
    this.getAllSpct();
    this.getAllKhachHang();
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
    hoaDon.hoaDonChiTiets = [];
    hoaDon.phiVanChuyen = 0;

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
      // this.order.phiVanChuyen = this.diaChiVaPhiVanChuyen.phiVanChuyen;
    } else {
      this.order.loaiHoaDon = "TAI_QUAY";
      this.order.phiVanChuyen = 0;
    }
  }

  chooseKhachHang(khachHang: KhachHang) {
    this.order.khachHang = khachHang;
    // this.diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
    // this.diaChiVaPhiVanChuyen.tinh = khachHang.diaChis[0].tinh;
    // this.diaChiVaPhiVanChuyen.huyen = khachHang.diaChis[0].huyen;
    // this.diaChiVaPhiVanChuyen.xa = khachHang.diaChis[0].xa;
  }

  removeKhachHangInOrder() {
    this.order.khachHang = null;
  }

  getAllSpct() {
    this.spctService.getAll(1, 15, this.searchProduct).subscribe({
      next: (resp) => {
        this.spcts = resp.data;
        // console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllKhachHang() {
    this.khachHangService.getAllActive(1, 10, this.searchKhachHang).subscribe({
      next: (resp: PagedResponse<KhachHang>) => {
        this.khachHangs = resp.data;
      },
      error: (err) => console.log(err),
    });
  }

  chooseProduct(spct: SanPhamChiTiet) {
    let newHdct = null;
    // check spct đã tồn tại trong DS HDCT của đơn hàng => +1 số lượng => ngắt vòng lặp
    for (let i = 0; i < this.order.hoaDonChiTiets.length; i++) {
      if (spct.id === this.order.hoaDonChiTiets[i].sanPhamChiTiet.id) {
        newHdct = this.order.hoaDonChiTiets[i];
        break;
      }
    }

    // xử lý
    if (newHdct == null) {
      //Không tồn tại => tạo mới hdct
      newHdct = this.newHDCT(spct);

      // add hoaDon current
      this.order.hoaDonChiTiets.push(newHdct);
    } else {
      // đã tồn tại => +1 số lượng trong hdct
      // check gia hien tai va gia trong hdct
      if (newHdct.giaBan != this.getGiaBan(spct)) {
        Swal.fire(
          "Giá bán đã được cập nhật do giá một số sản phẩm đã bị thay đổi."
        );
        newHdct.giaBan = this.getGiaBan(spct);
      }
      newHdct.soLuong = newHdct.soLuong + 1;
    }
  }

  newHDCT(spct: SanPhamChiTiet): HoaDonChiTiet {
    let hdct = new HoaDonChiTiet();
    hdct.sanPhamChiTiet = JSON.parse(JSON.stringify(spct));
    hdct.soLuong = 1;
    hdct.giaBan = this.getGiaBan(spct);

    return hdct;
  }
  getGiaBan(spct: SanPhamChiTiet): number {
    return this.spctService.getGiaBan(spct);
  }

  deleteHDCT(hdctIndex: number) {
    this.order.hoaDonChiTiets.splice(hdctIndex, 1);
  }
  minusQuantity(hdct: HoaDonChiTiet) {
    if (hdct.soLuong > 1) {
      hdct.soLuong = hdct.soLuong - 1;
    }
  }
  plusQuantity(hdct: HoaDonChiTiet) {
    hdct.soLuong = hdct.soLuong + 1;
  }

  getTongTien(): number {
    return this.banHangService.getTongTien(this.order.hoaDonChiTiets);
  }

  getSoLuongSanPham(): number {
    return this.banHangService.getSoLuongSanPham(this.order.hoaDonChiTiets);
  }
  getMustPay(): number {
    return this.banHangService.getMustPay(this.order);
  }

  thanhToan() {
    console.log(this.order);
  }

  phiVanChuyenChange($event: any) {
    this.order.phiVanChuyen = $event.target.value;
  }

  caculatePhiVanChuyen(soTien: number) {
    this.order.phiVanChuyen = soTien;
  }
}

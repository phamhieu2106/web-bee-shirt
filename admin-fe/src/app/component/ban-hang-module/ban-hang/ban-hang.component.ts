import { LocalStorageServiceService } from "./../../../service/local-storage-service.service";
import { BanHangService } from "./../../../service/ban-hang.service";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { KhachHangService } from "src/app/service/khach-hang.service";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import Swal from "sweetalert2";
import { DiscountValid } from "src/app/model/class/discount-valid.class";
import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";

@Component({
  selector: "app-ban-hang",
  templateUrl: "./ban-hang.component.html",
  styleUrls: ["./ban-hang.component.css"],
})
export class BanHangComponent implements OnInit, OnDestroy {
  icon: string = "  fa-solid fa-users";
  title: string = "Bán Hàng";
  mainHeading: string = "Bán Hàng";

  private readonly key = "orders";
  messagePgg = "";
  phiVanChuyenTemp: number;
  orders: HoaDon[] = [];
  khachHangs: KhachHang[];
  order: HoaDon;
  spcts: SanPhamChiTiet[];
  searchProduct = "";
  searchKhachHang = "";
  diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();

  constructor(
    private toast: ToastrService,
    private spctService: SanPhamChiTietService,
    private khachHangService: KhachHangService,
    private banHangService: BanHangService,
    private localStorageService: LocalStorageServiceService
  ) {}
  ngOnDestroy(): void {
    this.localStorageService.saveData(this.key, this.orders);
  }

  ngOnInit(): void {
    this.orders = this.localStorageService.getData(this.key);
    setTimeout(() => {
      if (this.orders == null || this.orders.length == 0) {
        this.orders = new Array<HoaDon>();
        this.newHoaDon();
      } else {
        this.order = this.orders[0];
      }
      this.getAllSpct();
      this.getAllKhachHang();
    }, 200);
  }
  clearSpcts() {
    this.spcts = [];
  }

  changeHoaDon(index: number) {
    this.order = this.orders[index];
  }

  async newHoaDon() {
    if (this.orders != null && this.orders.length >= 5) {
      this.toast.info("Bạn chỉ có thể tạo tối đa 5 đơn hàng");
      return;
    }
    let hoaDon = new HoaDon();
    let orderNameTemp =
      this.orders.length == 0 ? "Đơn 1" : this.newOrderNameTemp();
    // set default value
    hoaDon.orderNameTemp = orderNameTemp;
    hoaDon.tongTien = 0;
    hoaDon.tienGiam = 0;
    hoaDon.phiVanChuyen = 0;
    hoaDon.loaiHoaDon = "TAI_QUAY"; // TAI_QUAY or GIAO_HANG
    hoaDon.hoaDonChiTiets = [];
    hoaDon.phiVanChuyen = 0;
    hoaDon.nhanVien = null;
    hoaDon.khachHang = null;
    hoaDon.phieuGiamGia = new PhieuGiamGia();
    hoaDon.thanhToans = [];

    this.orders.push(hoaDon);
    this.order = hoaDon;
  }

  deleteOrder(index: number) {
    if (this.orders.length == 1) {
      this.orders.splice(index, 1);
      this.newHoaDon();

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
    this.updateHoaDon();
  }

  removeKhachHangInOrder() {
    this.order.khachHang = null;
    this.updateHoaDon();
  }

  getAllSpct() {
    this.spctService.getAll(1, 15, this.searchProduct).subscribe({
      next: (resp) => {
        this.spcts = resp.data;
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

  getPhieuGiamGia() {
    this.banHangService
      .getDiscountValid(
        this.getTongTien(),
        this.order.khachHang == null ? null : this.order.khachHang.id,
        this.order.tienGiam
      )
      .subscribe({
        next: async (resp: DiscountValid) => {
          this.order.phieuGiamGia = resp.phieuGiamGia;
          this.messagePgg = resp.message;
        },
        complete: () => {
          this.getTienGiam();
          this.getTongTien();
        },
      });
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
    // this.getPhieuGiamGia();
    if (this.order.hoaDonChiTiets.length <= 0) {
      this.order.thanhToans = [];
    }

    setTimeout(() => {
      this.getTongTien();
      this.getPhieuGiamGia();
      this.getTienGiam();
    }, 100);
  }
  minusQuantity(hdct: HoaDonChiTiet) {
    if (hdct.soLuong > 1) {
      hdct.soLuong -= 1;
    }
    this.getTongTien();
    setTimeout(() => {
      this.getPhieuGiamGia();
      this.getTienGiam();
    }, 100);
  }

  plusQuantity(hdct: HoaDonChiTiet) {
    hdct.soLuong += 1;
    this.getTongTien();
    setTimeout(() => {
      this.getPhieuGiamGia();
      this.getTienGiam();
    }, 100);
  }
  async chooseProduct(spct: SanPhamChiTiet) {
    let newHdct = null;
    // check spct đã tồn tại trong DS HDCT của đơn hàng => +1 số lượng => ngắt vòng lặp
    for (let i = 0; i < this.order.hoaDonChiTiets.length; i++) {
      if (spct.id === this.order.hoaDonChiTiets[i].sanPhamChiTiet.id) {
        newHdct = this.order.hoaDonChiTiets[i];

        break;
      }
    }

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
    this.updateHoaDon();
  }
  getTongTien(): number {
    if (
      this.order &&
      this.order.hoaDonChiTiets &&
      this.order.hoaDonChiTiets.length > 0
    ) {
      this.order.tongTien = this.banHangService.getTongTien(
        this.order.hoaDonChiTiets
      );
      return this.banHangService.getTongTien(this.order.hoaDonChiTiets);
    }
    return 0; // hoặc giá trị mặc định khác
  }

  getSoLuongSanPham(): number {
    return this.order != null
      ? this.banHangService.getSoLuongSanPham(this.order.hoaDonChiTiets)
      : 0;
  }
  getMustPay(): number {
    // let total = this.banHangService.getMustPay(this.order);
    return this.banHangService.getMustPay(this.order);
  }

  muaHang() {
    if (this.order.loaiHoaDon == "TAI_QUAY") {
      this.order.diaChiNguoiNhan = null;
    }
    console.log(this.order);
  }

  datHang() {
    if (this.order.loaiHoaDon == "GIAO_HANG") {
      this.order.diaChiNguoiNhan = null;
    }
    console.log(this.order);
  }

  phiVanChuyenChange($event: any) {
    this.order.phiVanChuyen = $event.target.value;
  }

  caculatePhiVanChuyen(soTien: number) {
    this.order.phiVanChuyen = soTien;
  }
  getDiaChiNguoiNhan(diaChi: string) {
    this.order.diaChiNguoiNhan = diaChi;
  }

  getTienKhachThanhToan(): number {
    if (
      this.order &&
      this.order.thanhToans != null &&
      this.order.thanhToans.length > 0
    ) {
      return this.order.thanhToans
        .map((thanhToan) => thanhToan.soTien)
        .reduce((pre, curr) => pre + curr, 0);
    }
    return 0;
  }

  getTienKhachConThieu(): number {
    if (this.order && this.order.tongTien != null)
      return this.getMustPay() - this.getTienKhachThanhToan();
    else return 0;
  }

  getTienGiam(): number {
    if (this.order && this.order.phieuGiamGia) {
      if (this.order.phieuGiamGia.kieu == 0) {
        // giảm theo %
        let giaTriGiam =
          this.order.tongTien * (this.order.phieuGiamGia.giaTri / 100);
        let giaTriMax = this.order.phieuGiamGia.giaTriMax;

        giaTriGiam > giaTriMax
          ? (this.order.tienGiam = giaTriMax)
          : (this.order.tienGiam = giaTriGiam);

        return this.order.tienGiam;
      } else if (this.order.phieuGiamGia.kieu == 1) {
        // giảm theo giá trị
        this.order.tienGiam = this.order.phieuGiamGia.giaTri;
        return this.order.tienGiam;
      }
    }
    this.order.tienGiam = 0;
    return 0;
  }

  async updateHoaDon() {
    // xử lý
    setTimeout(async () => {
      await this.getTongTien();
      // await this.getTienGiam();
      await this.getPhieuGiamGia();
      await this.getTienGiam();
      await this.getTienKhachConThieu();
    }, 100);
  }

  insertSLSP() {
    this.updateHoaDon();
  }
}

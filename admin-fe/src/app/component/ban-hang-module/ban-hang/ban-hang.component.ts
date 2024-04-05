import { PdfService } from "./../../../service/pdf.service";
import { LocalStorageServiceService } from "./../../../service/local-storage-service.service";
import { BanHangService } from "./../../../service/ban-hang.service";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
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
import { HoaDonService } from "src/app/service/hoa-don.service";
import { DiaChi } from "src/app/model/class/dia-chi.class";
import { NotificationService } from "src/app/service/notification.service";
import { el } from "date-fns/locale";

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
    private spctService: SanPhamChiTietService,
    private khachHangService: KhachHangService,
    private banHangService: BanHangService,
    private localStorageService: LocalStorageServiceService,
    private hoaDonService: HoaDonService,
    private pdfService: PdfService,
    private notification: NotificationService
  ) {}
  ngOnDestroy(): void {
    this.localStorageService.saveData(this.key, this.orders);
  }
  @HostListener("window:beforeunload", ["$event"])
  beforeUnloadHandler(event: Event) {
    // Thực hiện các công việc cần thiết trước khi trang được thoát hoặc làm mới
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
    if (this.orders != null && this.orders.length >= 10) {
      this.notification.warning("Bạn chỉ có thể tạo tối đa 10 đơn hàng");
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
    // hoaDon.phieuGiamGia = new PhieuGiamGia();
    hoaDon.thanhToans = [];

    this.orders.push(hoaDon);
    this.order = hoaDon;
  }

  deleteOrder(index: number) {
    if (this.order.hoaDonChiTiets.length > 0) {
      Swal.fire({
        text: "Bạn có muốn xóa đơn hàng này không ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Đã xóa",
            icon: "success",
          });
          this.deleteOrderTemp(index);
        }
      });
    } else {
      this.deleteOrderTemp(index);
    }
  }
  deleteOrderTemp(index: number) {
    this.orders.splice(index, 1);
    if (this.orders.length <= 0) {
      this.newHoaDon();
    } else {
      this.order = this.orders[this.orders.length - 1];
    }
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
      if (this.order.khachHang != null) {
        this.order.tenNguoiNhan = this.order.khachHang.hoTen + "";
        this.order.sdtNguoiNhan = this.order.khachHang.sdt + "";
      }
    } else {
      this.order.loaiHoaDon = "TAI_QUAY";
      this.order.phiVanChuyen = 0;
      this.order.diaChiNguoiNhan = null;
    }
  }

  chooseKhachHang(khachHang: KhachHang) {
    this.order.khachHang = khachHang;
    this.updateHoaDon();
    if (this.order.loaiHoaDon == "GIAO_HANG") {
      this.order.tenNguoiNhan = khachHang.hoTen;
      this.order.sdtNguoiNhan = khachHang.sdt;
    }
  }

  removeKhachHangInOrder() {
    this.order.khachHang = null;
    this.order.tenNguoiNhan = null;
    this.order.sdtNguoiNhan = null;
    this.order.diaChiNguoiNhan = null;
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
    hdct.giaNhap = spct.giaNhap;
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

  getSoLuongSanPham(order: HoaDon): number {
    return order != null
      ? this.banHangService.getSoLuongSanPham(order.hoaDonChiTiets)
      : 0;
  }
  getMustPay(): number {
    // let total = this.banHangService.getMustPay(this.order);
    return this.banHangService.getMustPay(this.order);
  }

  muaHang() {
    if (this.order.loaiHoaDon == "TAI_QUAY") {
      // kiểm tra khach thanh toán đủ chưa
      if (this.getTienKhachConThieu() == 0) {
        // xác thanh toán
        let hoaDonRequest = this.hoaDonService.mapToHoaDonRequest(
          this.order,
          null
        );
        this.hoaDonService.placeOrder(hoaDonRequest).subscribe({
          next: (resp: HoaDon) => {
            // console.log(resp);
            this.pdfService.generatePDFHoaDon(resp);
            // xoa don
            for (let i = 0; i < this.orders.length; i++) {
              if (this.orders[i].orderNameTemp == this.order.orderNameTemp) {
                this.deleteOrderTemp(i);
                break;
              }
            }
            this.notification.success("Mua hàng thành công");
          },
          error: (err: any) => {
            this.notification.error(err.error.message);
          },
        });
        // console.log(hoaDonRequest);
      } else {
        Swal.fire("Đơn hàng của bạn vẫn chưa được thanh toán đủ tiền .");
      }
    }
  }

  async datHang() {
    console.log(this.order);

    if (this.order.loaiHoaDon == "GIAO_HANG") {
      let regex = new RegExp("^(0[3|5|7|8|9])+([0-9]{8})\\b$");

      if (
        this.order.tenNguoiNhan == null ||
        this.order.tenNguoiNhan == undefined
      ) {
        this.notification.warning("Bạn chưa nhập tên người nhận");
        return;
      }
      if (
        this.order.sdtNguoiNhan == null ||
        this.order.sdtNguoiNhan == undefined
      ) {
        this.notification.warning("Bạn chưa nhập số điện thoại người nhận");
        return;
      }
      if (!regex.test(this.order.sdtNguoiNhan)) {
        this.notification.warning("Số điện thoại người nhận không hợp lệ");
        return;
      }
      if (
        this.order.diaChiNguoiNhan == null ||
        this.order.diaChiNguoiNhan == undefined
      ) {
        this.notification.warning("Bạn chưa chọn địa chỉ người nhận");
        return;
      }
      let diaChis = this.order.diaChiNguoiNhan.split(",");
      if (diaChis[0] == null || diaChis[0] == undefined || diaChis[0] == "") {
        this.notification.warning("Bạn chưa nhập địa chỉ cụ thể");
        return;
      }
      let hoaDonRequest = this.hoaDonService.mapToHoaDonRequest(
        this.order,
        this.diaChiVaPhiVanChuyen
      );
      this.hoaDonService.placeOrder(hoaDonRequest).subscribe({
        next: (resp: HoaDon) => {
          // console.log(resp);
          // xoa don
          for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].orderNameTemp == this.order.orderNameTemp) {
              this.deleteOrderTemp(i);
              break;
            }
          }
          this.notification.success("Đặt hàng thành công");
        },
        error: (err: any) => {
          this.notification.error(err.error.message);
        },
      });
      // console.log(hoaDonRequest);
    }
  }

  phiVanChuyenChange($event: any) {
    this.order.phiVanChuyen = $event.target.value;
  }

  caculatePhiVanChuyen(soTien: number) {
    this.order.phiVanChuyen = soTien;
  }
  getDiaChiNguoiNhan($event: string) {
    this.order.diaChiNguoiNhan = $event;
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

  getDiaChiMacDinh(diaChis: DiaChi[]): DiaChi {
    for (let i = 0; i < diaChis.length; i++) {
      if (diaChis[i].macDinh == true) {
        return diaChis[i];
      }
    }
    return null;
  }

  // Để đóng modal
  closeModal(idModal: string): void {
    document.getElementById(idModal).click();
  }
}

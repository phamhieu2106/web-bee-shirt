import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { TraHangService } from "src/app/service/tra-hang.service";
import { QuantityInputComponent } from "../quantity-input/quantity-input.component";
import { HttpErrorResponse } from "@angular/common/http";
import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { HoaDonRequest } from "src/app/model/class/hoa-don-request.class";
import Swal from "sweetalert2";
import { HoaDonChiTietRequest } from "src/app/model/class/hoa-don-chi-tiet-request.class";
import { PdfService } from "src/app/service/pdf.service";
import { HoaDonTraHangRequest } from "src/app/model/class/hoa-don-tra-hang-request";
import { PdfTraHangService } from "src/app/service/pdf-tra-hang.service";
@Component({
  selector: "app-chi-tiet-hoa-don",
  templateUrl: "./chi-tiet-hoa-don.component.html",
  styleUrls: ["./chi-tiet-hoa-don.component.css"],
})
export class ChiTietHoaDonComponent {
  @Input() hoaDon: HoaDon;
  // Table variables
  public listOfSelection = [
    {
      text: "Select All Row",
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
  ];
  public checked = false;
  public indeterminate = false;
  public listOfCurrentPageData: readonly HoaDonChiTiet[] = [];
  public listOfData: HoaDonChiTiet[] = [];
  public setOfCheckedId = new Set<number>();
  public listReturnItems: HoaDonChiTiet[] = [];
  public listIdDotGiamGiaSanPham: number[] = [];

  public discountMoney: number = 0;
  public oldAmount: number = 0;
  public newAmount: number = 0;
  public amountOfMoneyReturn: number = 0;
  public bestVoucher: PhieuGiamGia;

  // Object properties
  isVisible = false;
  hoaDonRequest?: HoaDonRequest = {};
  hoaDonTraHangRequest?: HoaDonTraHangRequest = {};
  radioValue = "A";
  text: string;
  // Constructors Component
  constructor(
    private traHangService: TraHangService,
    private phieuGiamGiaService: PhieuGiamGiaService,
    private router: Router,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef,
    private pdfService: PdfService,
    private pdfTraHangService: PdfTraHangService
  ) {}
  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.hoaDon) {
      this.listOfData = [];
      this.listReturnItems = [];
      this.listOfSelection = [];
      this.amountOfMoneyReturn = 0;
      this.oldAmount = this.hoaDon.tongTien;
      this.newAmount = this.hoaDon.tongTien;
      this.discountMoney = 0;
      this.getListIdDotGiamGiaSanPham(this.hoaDon.id);
      this.hoaDon.hoaDonChiTiets.forEach((item) => this.listOfData.push(item));
      this.cdr.detectChanges();
    }

    if (this.newAmount) {
      this.handleCountReturnMoney();
    }
  }
  // End Constructor Component

  // Functions Tables
  onCurrentPageDataChange($event: readonly HoaDonChiTiet[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  isInListIdDotGiamGiaSanPham(id: number): boolean {
    return this.listIdDotGiamGiaSanPham.includes(id);
  }

  getListIdDotGiamGiaSanPham(idHoaDon: number): void {
    this.traHangService.getListIdDotGiamGiaSanPham(idHoaDon).subscribe({
      next: (response: number[]) => {
        this.listIdDotGiamGiaSanPham = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean, quantity: number): void {
    if (checked) {
      this.handleReturnItems(id, quantity);
    } else {
      this.removeReturnItem(id);
    }
    this.handleCountReturnMoney();
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  removeReturnItem(id: number) {
    // Tạo một bản sao mới của listReturnItems
    const updatedListReturnItems = this.listReturnItems.filter(
      (item) => item.id !== id
    );

    // Gán lại listReturnItems bằng bản sao mới
    this.listReturnItems = updatedListReturnItems;

    // Thông báo cho Angular biết về sự thay đổi
    this.cdr.detectChanges();
  }
  handleReturnItems(id: number, quantity: number) {
    // Tạo một bản sao mới của listReturnItems
    if (this.listReturnItems.findIndex((item) => item.id === id) != -1) {
      this.cdr.detectChanges();
    } else {
      const updatedListReturnItems = [...this.listReturnItems];

      // Thêm hoá đơn chi tiết vào danh sách
      const newHoaDonChiTiet = {
        ...this.listOfData.find((item) => item.id == id),
      };
      if (
        this.listIdDotGiamGiaSanPham.includes(
          newHoaDonChiTiet.sanPhamChiTiet.id
        )
      ) {
        return;
      }
      newHoaDonChiTiet.soLuong = quantity;
      updatedListReturnItems.push(newHoaDonChiTiet);
      this.listReturnItems = updatedListReturnItems;
      this.cdr.detectChanges();
    }
  }
  onAllChecked(value: boolean): void {
    if (!value) {
      this.listReturnItems = [];
      this.setOfCheckedId.clear();
    } else {
      this.listOfData.forEach((item) => {
        this.handleReturnItems(item.id, item.soLuong);
        this.updateCheckedSet(item.id, value);
      });
    }
    this.handleCountReturnMoney();
    this.refreshCheckedStatus();
  }

  // End Funtion Tables

  // ON Quantity Of Products
  confirmModal?: NzModalRef; // For testing by now
  showConfirmOfQuantity(id: number, quantity: number, checked: boolean): void {
    if (checked) {
      if (quantity == 1) {
        this.onItemChecked(id, checked, quantity);
        return;
      } else {
        this.confirmModal = this.modal.confirm({
          nzTitle: "Số lượng sản phẩm khách hàng muốn trả?",
          nzContent: QuantityInputComponent, // Sử dụng component trong nội dung của modal
          nzOnOk: () =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                this.onItemChecked(
                  id,
                  checked,
                  this.confirmModal.componentInstance.quantity
                );
                resolve();
              }, 500);
            }).catch(() => console.log("Oops errors!")),
        });
      }
      this.confirmModal.componentInstance.quantity = quantity;
      this.confirmModal.componentInstance.maxQuantity = quantity;
    } else {
      this.onItemChecked(id, checked, quantity);
    }
  }

  minusQuantity(id: number) {
    const hoaDonChiTiet = this.listReturnItems.find((item) => item.id === id);
    if (hoaDonChiTiet) {
      hoaDonChiTiet.soLuong = hoaDonChiTiet.soLuong - 1;
      if (hoaDonChiTiet.soLuong <= 0) {
        hoaDonChiTiet.soLuong = 1;
      }
    }
    this.handleCountReturnMoney();
  }
  plusQuantity(id: number) {
    const hoaDonChiTiet = this.listReturnItems.find((item) => item.id === id);
    const maxQuantity = this.listOfData.find((item) => item.id === id).soLuong;
    if (hoaDonChiTiet) {
      hoaDonChiTiet.soLuong = hoaDonChiTiet.soLuong + 1;
      if (hoaDonChiTiet.soLuong >= maxQuantity) {
        hoaDonChiTiet.soLuong = maxQuantity;
      }
    }
    this.handleCountReturnMoney();
  }
  // END Quantity Of Products

  // Return Information
  private async handleCountReturnMoney() {
    if (!this.listReturnItems || this.listReturnItems.length === 0) {
      this.amountOfMoneyReturn = 0;
      this.newAmount = this.hoaDon?.tongTien;
      return;
    }
    const voucher = this.hoaDon?.phieuGiamGia
      ? this.hoaDon?.phieuGiamGia
      : null;
    // Sử dụng reduce để tính tổng số tiền trả lại từ các mặt hàng trong listReturnItems
    this.amountOfMoneyReturn = this.listReturnItems.reduce((sum, item) => {
      if (
        item &&
        typeof item.giaBan === "number" &&
        typeof item.soLuong === "number"
      ) {
        return sum + item.giaBan * item.soLuong;
      } else {
        return sum;
      }
    }, 0);

    const tongTienHoaDonCu = this.hoaDon.hoaDonChiTiets.reduce((sum, item) => {
      const returnItem = this.listReturnItems.find(
        (returnItem) => returnItem.id === item.id
      );
      const newSoLuong = returnItem
        ? item.soLuong - returnItem.soLuong
        : item.soLuong;
      if (newSoLuong > 0) {
        return sum + item.giaBan * newSoLuong;
      } else {
        return sum;
      }
    }, 0);
    this.newAmount = tongTienHoaDonCu;

    // Kiểm tra xem đơn có voucher hay không
    if (voucher) {
      if (this.newAmount >= voucher.dieuKienGiam) {
        // Nếu có thì kiểm tra xem liệu tổng tiền mới có đủ áp dụng cho voucher ban đầu
        this.setTienHoanTraVoiPhieuGiamGiaCu(voucher);
      } else {
        // Nếu không áp dụng được
        this.setTienHoanTraVoiPhieuGiamGiaMoi();
      }
    }
  }
  private setTienHoanTraKhongCoPhieuGiamGiaMoi() {
    this.bestVoucher = null;
    this.discountMoney = 0;
    this.amountOfMoneyReturn =
      this.hoaDon?.tongTien - this.newAmount - this.hoaDon?.tienGiam;
  }
  private setTienHoanTraVoiPhieuGiamGiaCu(voucher: PhieuGiamGia): void {
    let discount = 0;
    if (voucher.kieu === 0) {
      // Kiểu phần trăm
      const totalPrice = this.newAmount;
      discount = Math.min(
        voucher.giaTriMax,
        (totalPrice * voucher.giaTri) / 100
      );
    } else if (voucher.kieu === 1) {
      // Kiểu tiền mặt
      discount = Math.min(voucher.giaTri /* Tổng giá trị hóa đơn */);
    }

    this.discountMoney = discount;
    this.bestVoucher = voucher;

    this.amountOfMoneyReturn =
      this.oldAmount - this.newAmount - this.discountMoney <= 0
        ? 0
        : this.oldAmount - this.newAmount - this.discountMoney;
  }
  private setTienHoanTraVoiPhieuGiamGiaMoi(): void {
    let maxDiscount = 0;
    let guestOwedMoney = 0;
    let shopLoss = 0;
    this.phieuGiamGiaService.getPhieuGiamGiaList().subscribe({
      next: (data) => {
        // dùng vòng lặp để kiểm tra voucher nào là tốt nhất
        data
          .filter(
            (voucher) =>
              voucher.soLuong > 0 && this.newAmount >= voucher.dieuKienGiam
          )
          .forEach((voucher) => {
            let discount = 0;

            // Tính toán giá trị giảm giá từ mỗi voucher
            if (voucher.kieu === 0) {
              // Kiểu phần trăm
              const totalPrice = this.newAmount;
              discount = Math.min(
                voucher.giaTriMax,
                (totalPrice * voucher.giaTri) / 100
              );
            } else if (voucher.kieu === 1) {
              // Kiểu tiền mặt
              discount = Math.min(voucher.giaTri /* Tổng giá trị hóa đơn */);
            }

            // So sánh giá trị giảm giá của voucher với maxDiscount
            if (discount > maxDiscount) {
              maxDiscount = discount;
              this.bestVoucher = voucher;
            }
          });
        if (this.bestVoucher) {
          // Khi tìm được voucher tốt nhất sẽ kiểm tra kiểu voucher
          if (
            this.bestVoucher.kieu === 0 &&
            this.newAmount > this.bestVoucher.dieuKienGiam
          ) {
            // Kiểu phần trăm
            // Tính tiền khách nợ và cửa hàng lỗ
            guestOwedMoney =
              this.newAmount * (this.hoaDon?.phieuGiamGia?.giaTri / 100);
            console.log(guestOwedMoney);
            shopLoss = maxDiscount;

            // Gán voucher
            this.discountMoney = shopLoss;
            // Tính tiền trả lại
            const tongTienTraThucTe =
              this.amountOfMoneyReturn -
              (this.amountOfMoneyReturn * this.hoaDon?.phieuGiamGia?.giaTri) /
                100;
            this.amountOfMoneyReturn =
              tongTienTraThucTe - guestOwedMoney + shopLoss;
          } else if (
            this.bestVoucher.kieu === 1 &&
            this.newAmount > this.bestVoucher.dieuKienGiam
          ) {
            // Kiểu tiền mặt
            guestOwedMoney = this.hoaDon?.phieuGiamGia?.giaTri;
            shopLoss = this.bestVoucher?.giaTri;
            // Gán voucher
            this.discountMoney = shopLoss;
            // Tính tiền trả lại
            const tongTienTraThucTe =
              this.amountOfMoneyReturn - this.hoaDon?.phieuGiamGia?.giaTri;

            this.amountOfMoneyReturn =
              tongTienTraThucTe - guestOwedMoney + shopLoss;
          } else {
            this.setTienHoanTraKhongCoPhieuGiamGiaMoi();
          }
        } else {
          this.setTienHoanTraKhongCoPhieuGiamGiaMoi();
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
  calculateSum(): number {
    return this.listReturnItems.reduce((sum, item) => {
      return sum + item.soLuong;
    }, 0);
  }
  // End Return Information

  // Object Functions
  private validation(): boolean {
    if (this.radioValue === "A") {
      this.text = "Sản phẩm không đúng như mô tả";
    } else if (this.radioValue === "B") {
      this.text = "Sản phẩm không đúng kích cỡ hoặc màu sắc";
    } else if (this.radioValue === "C") {
      this.text = "Sản phẩm bị lỗi (rách, mất cúc áo, cúc tay, mốc, v.v)";
    }
    if (this.text?.trim().length < 10) {
      Swal.fire({
        toast: true,
        icon: "error",
        position: "top-end",
        title: "Lý do phải có ít nhất 10 kí tự",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      return false;
    }
    return true;
  }
  private validationHoaDonTraHang(): boolean {
    if (this.text?.trim().length < 10) {
      Swal.fire({
        toast: true,
        icon: "error",
        position: "top-end",
        title: "Lý do phải có ít nhất 10 kí tự",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      return false;
    }
    return true;
  }
  private returnBuyItems(): HoaDonChiTiet[] {
    const listBuyedItems = this.hoaDon.hoaDonChiTiets.map((item) => ({
      ...item,
    }));
    const listItemsReturn: HoaDonChiTiet[] = this.listReturnItems;
    const list: HoaDonChiTiet[] = [...listBuyedItems];

    // Lặp qua từng mục trong listItemsReturn
    for (const itemReturn of listItemsReturn) {
      const index = list.findIndex((item) => item.id === itemReturn.id);
      if (index !== -1 && list[index].soLuong > 0) {
        // Trừ số lượng được trả lại từ số lượng đã mua
        list[index].soLuong -= itemReturn.soLuong;
        // Nếu số lượng đã mua sau khi trừ bằng 0, loại bỏ mục này khỏi list
        if (list[index].soLuong === 0) {
          list.splice(index, 1);
        }
      }
    }
    return list;
  }
  private setHoaDonRequest() {
    if (this.validation()) {
      // hoá đơn object
      this.hoaDonRequest.tenNguoiNhan = this.hoaDon?.tenNguoiNhan
        ? this.hoaDon?.tenNguoiNhan
        : this.hoaDon.khachHang?.hoTen
        ? this.hoaDon.khachHang?.hoTen
        : "";
      this.hoaDonRequest.sdtNguoiNhan = this.hoaDon?.sdtNguoiNhan
        ? this.hoaDon?.sdtNguoiNhan
        : this.hoaDon?.khachHang
        ? this.hoaDon?.khachHang.sdt
        : "";
      this.hoaDonRequest.diaChiNguoiNhan = this.hoaDon.diaChiNguoiNhan
        ? this.hoaDon.diaChiNguoiNhan
        : "";
      this.hoaDonRequest.emailNguoiNhan = this.hoaDon.emailNguoiNhan;
      this.hoaDonRequest.loaiHoaDon = "TAI_QUAY";
      this.hoaDonRequest.ghiChu = "Hóa đơn mới của hóa đơn trả hàng";
      this.hoaDonRequest.phieuGiamGiaId = this.bestVoucher?.id;
      this.hoaDonRequest.nhanVienId = JSON.parse(
        localStorage.getItem("nhanVien")
      ).id;
      this.hoaDonRequest.khachHangId = this.hoaDon.khachHang?.id;
      // Money
      this.hoaDonRequest.tongTien = this.newAmount;
      this.hoaDonRequest.tienGiam = this.discountMoney;

      this.hoaDonRequest.thanhToans = [
        {
          hinhThucThanhToan: "TIEN_MAT",
          moTa: undefined,
          maGiaoDich: undefined,
          soTien: undefined,
        },
      ];
      this.hoaDonRequest.phiVanChuyen = 0;
      // Hoa Don Chi Tiet
      this.hoaDonRequest.hoaDonChiTiets = this.returnBuyItems().map((hdct) => {
        let hdctRequest = new HoaDonChiTietRequest();
        hdctRequest.soLuong = hdct.soLuong;
        hdctRequest.giaBan = hdct.giaBan;
        hdctRequest.giaNhap = hdct.giaNhap;
        hdctRequest.sanPhamChiTietId = hdct.sanPhamChiTiet.id;
        return hdctRequest;
      });
    } else {
      Swal.fire({
        toast: true,
        icon: "error",
        position: "top-end",
        title: "Có lỗi gì đó khi cố gắng tạo ra hoá đơn mới",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    }
  }
  private setHoaDonTraHangRequest() {
    if (this.validationHoaDonTraHang) {
      this.hoaDonTraHangRequest.hoaDonId = this.hoaDon?.id;
      this.hoaDonTraHangRequest.tenNguoiNhan = this.hoaDon?.tenNguoiNhan
        ? this.hoaDon.tenNguoiNhan
        : this.hoaDon?.khachHang?.hoTen
        ? this.hoaDon.khachHang.hoTen
        : null;
      this.hoaDonTraHangRequest.nhanVienId = JSON.parse(
        localStorage.getItem("nhanVien")
      ).id;
      this.hoaDonTraHangRequest.khachHangId = this.hoaDon?.khachHang?.id;
      this.hoaDonTraHangRequest.sdtNguoiNhan = this.hoaDon?.sdtNguoiNhan
        ? this.hoaDon?.sdtNguoiNhan
        : this.hoaDon?.khachHang?.sdt
        ? this.hoaDon?.khachHang?.sdt
        : null;
      this.hoaDonTraHangRequest.diaChiNguoiNhan = this.hoaDon?.diaChiNguoiNhan;
      this.hoaDonTraHangRequest.emailNguoiNhan = this.hoaDon?.emailNguoiNhan
        ? this.hoaDon?.emailNguoiNhan
        : this.hoaDon?.khachHang?.email
        ? this.hoaDon?.khachHang?.email
        : null;
      this.hoaDonTraHangRequest.tongTien = this.oldAmount - this.newAmount;
      this.hoaDonTraHangRequest.tongTienPhieuGiamGiaCu = this.hoaDon?.tienGiam;
      this.hoaDonTraHangRequest.tongTienPhieuGiamGiaMoi = this.discountMoney;
      this.hoaDonTraHangRequest.tongTienTraKhach = this.amountOfMoneyReturn;
      this.hoaDonTraHangRequest.ghiChu = this.text;
      this.hoaDonTraHangRequest.hoaDonChiTiets = this.listReturnItems.map(
        (hdct) => {
          let hdctRequest = new HoaDonChiTietRequest();
          hdctRequest.soLuong = hdct.soLuong;
          hdctRequest.giaBan = hdct.giaBan;
          hdctRequest.giaNhap = hdct.giaNhap;
          hdctRequest.sanPhamChiTietId = hdct.sanPhamChiTiet.id;
          return hdctRequest;
        }
      );
    }
  }
  private handleSetTrangThaiHoaDon(): boolean {
    this.traHangService
      .handleTraHang(this.hoaDon?.id, this.text, true)
      .subscribe({
        error: (err) => {
          console.log(err.error.message);
          Swal.fire({
            icon: "error",
            title: `Thay đổi trạng thái hoá đơn thất bại''!`,
            showConfirmButton: false,
            timer: 1500,
          });
          return false;
        },
      });
    return true;
  }
  private handleCreateHoaDonTraHang(): boolean {
    this.traHangService.handleTaoHoaDon(this.hoaDonTraHangRequest).subscribe({
      next: (resp) => {
        this.pdfTraHangService.generatePDFHoaDon(resp);
      },
      error: (err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: `Tạo hoá đơn trả hàng thất bại''!`,
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      },
    });
    return true;
  }

  // ON Submit
  public handleOk(): void {
    this.setHoaDonRequest();
    // nếu hoá đơn còn sản phẩm thì in hoá đơn mới
    if (this.hoaDonRequest.hoaDonChiTiets.length > 0) {
      this.traHangService.placeOrderTraHang(this.hoaDonRequest).subscribe({
        next: async (resp: HoaDon) => {
          this.setHoaDonTraHangRequest();
          // Handle return Tra Hang
          if (
            this.handleSetTrangThaiHoaDon() &&
            this.handleCreateHoaDonTraHang()
          ) {
            // Generate PDF Invoice
            await this.pdfService.generatePDFHoaDon(resp);
            Swal.fire({
              icon: "success",
              title: `Trả hàng thành công''!`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.redirect();
          } else {
            Swal.fire({
              icon: "error",
              title: `Có lỗi khi cố gắng tạo hoá đơn trả hàng''!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        error: (err: any) => {
          console.log(err.error.message);
          Swal.fire({
            icon: "error",
            title: `Trả hàng thất bại''!`,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      // nếu không còn sản phẩm sẽ chỉ thay đổi trạng thái và in hoá đơn trả hàng
      this.setHoaDonTraHangRequest();
      // Handle return Tra Hang
      if (this.handleSetTrangThaiHoaDon() && this.handleCreateHoaDonTraHang()) {
        Swal.fire({
          icon: "success",
          title: `Trả hàng thành công''!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.redirect();
      } else {
        Swal.fire({
          icon: "error",
          title: `Có lỗi khi cố gắng tạo hoá đơn trả hàng''!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    this.isVisible = false;
  }

  private redirect(): void {
    this.router.navigate(["/tra-hang-thanh-cong"]);
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  // End SUBMIT
}

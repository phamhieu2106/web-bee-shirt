import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { HoaDonChiTiet } from "src/app/model/class/hoa-don-chi-tiet.class";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { TraHangService } from "src/app/service/tra-hang.service";
import { QuantityInputComponent } from "../quantity-input/quantity-input.component";
@Component({
  selector: "app-chi-tiet-hoa-don",
  templateUrl: "./chi-tiet-hoa-don.component.html",
  styleUrls: ["./chi-tiet-hoa-don.component.css"],
})
export class ChiTietHoaDonComponent {
  // public variables
  @Input() hoaDon: HoaDon;

  // Constructors
  constructor(
    private traHangService: TraHangService,
    private router: Router,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.hoaDon) {
      this.listOfData = [];
      this.hoaDon.hoaDonChiTiets.forEach((item) => this.listOfData.push(item));
      this.cdr.detectChanges();
    }
  }
  // Varribles Component

  // Varribles Table
  listOfSelection = [
    {
      text: "Select All Row",
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly HoaDonChiTiet[] = [];
  listOfData: HoaDonChiTiet[] = [];
  setOfCheckedId = new Set<number>();

  onCurrentPageDataChange($event: readonly HoaDonChiTiet[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  // Functions
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

  listReturnItems: HoaDonChiTiet[] = [];
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
      newHoaDonChiTiet.soLuong = quantity;
      updatedListReturnItems.push(newHoaDonChiTiet);
      this.listReturnItems = updatedListReturnItems;
      this.cdr.detectChanges();
    }
  }

  handleCountReturnMoney() {
    if (!this.listReturnItems || this.listReturnItems.length === 0) {
      this.amountOfMoneyReturn = 0;
      return;
    }

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
  }
  onAllChecked(value: boolean): void {
    if (!value) {
      this.listReturnItems = [];
      this.setOfCheckedId.clear();
    } else {
      this.listOfCurrentPageData.forEach((item) => {
        this.handleReturnItems(item.id, item.soLuong);
        this.updateCheckedSet(item.id, value);
      });
    }
    this.handleCountReturnMoney();
    this.refreshCheckedStatus();
  }
  // ON Quantity Of Products
  confirmModal?: NzModalRef; // For testing by now
  showConfirmOfQuantity(id: number, quantity: number, checked: boolean): void {
    if (checked) {
      if (quantity == 1) {
        this.onItemChecked(id, checked, quantity);
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
      if (hoaDonChiTiet.soLuong === 0) {
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

  // ON Submit
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }
  // Object properties
  radioValue = "A";
  moreText: string;

  amountOfMoneyReturn: number = 0;
  handleOk(): void {
    this.isVisible = false;
    console.log(this.radioValue);
    this.hoaDon = null;
    this.router.navigate(["/tra-hang-thanh-cong"]);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  // End SUBMIT
}

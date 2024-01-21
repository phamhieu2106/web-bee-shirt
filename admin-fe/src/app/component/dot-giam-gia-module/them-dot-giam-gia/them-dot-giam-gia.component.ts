import { Component } from "@angular/core";

@Component({
  selector: "app-form-add",
  templateUrl: "./them-dot-giam-gia.component.html",
  styleUrls: ["./them-dot-giam-gia.component.css"],
})
export class ThemDotGiamGiaComponent {
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  modalTitle: string = "Xác Nhận Thêm";
  modalMessage: string = "Bạn chắc chắn muốn thêm đợt khuyến mại mới?";
  modalAction: string = "Thêm mới";
  titleTableProduct: string = "Danh Sách Sản Phẩm ";
  titleTableProducts: string = "Danh Sách Chi Tiết Sản Phẩm ";
  tHeadProduct: Array<string> = ["STT", "Tên Sản Phẩm", "Trạng Thái"];
}

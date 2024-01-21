import { Component } from "@angular/core";

@Component({
  selector: "app-cap-nhat-dot-giam-gia",
  templateUrl: "./cap-nhat-dot-giam-gia.component.html",
  styleUrls: ["./cap-nhat-dot-giam-gia.component.css"],
})
export class CapNhatDotGiamGiaComponent {
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  modalTitle: string = "Xác Nhận Sửa";
  modalMessage: string = "Bạn chắc chắn muốn sửa đợt khuyến mại?";
  modalAction: string = "Cập nhật";
  titleTableProduct: string = "Danh Sách Sản Phẩm ";
  titleTableProducts: string = "Danh Sách Chi Tiết Sản Phẩm ";
  tHeadProduct: Array<string> = ["STT", "Tên Sản Phẩm", "Trạng Thái"];
  formHeader: string = "Cập Nhật Đợt Giảm Giá";
  formButton: string = "Cập Nhật";
}

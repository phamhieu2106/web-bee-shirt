import { Component } from "@angular/core";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";

@Component({
  selector: "app-form-add",
  templateUrl: "./them-dot-giam-gia.component.html",
  styleUrls: ["./them-dot-giam-gia.component.css"],
})
export class ThemDotGiamGiaComponent {
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  titleTableProduct: string = "Danh Sách Sản Phẩm ";
  titleTableProducts: string = "Danh Sách Chi Tiết Sản Phẩm ";
  tHeadProduct: Array<string> = ["STT", "Tên Sản Phẩm", "Trạng Thái"];
  formHeader: string = "Thêm Đợt Giảm Giá";
  formButton: string = "Thêm mới";
  // varribles for child elements
  dotGiamGiaRequest: DotGiamGia;
  listIdSanPham: Array<number>;
  constructor(private service: DotGiamGiaService) {}

  public setDotGiamGiaCreateRequest(): void {
    this.dotGiamGiaRequest.listSanPham = this.listIdSanPham;
  }
}

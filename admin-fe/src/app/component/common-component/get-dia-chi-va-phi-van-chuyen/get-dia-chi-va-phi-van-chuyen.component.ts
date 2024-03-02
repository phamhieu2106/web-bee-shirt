import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { DiaChiVaPhiVanChuyen } from "./../../../model/class/dia-chi-va-phi-van-chuyen.class";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-get-dia-chi-va-phi-van-chuyen",
  templateUrl: "./get-dia-chi-va-phi-van-chuyen.component.html",
  styleUrls: ["./get-dia-chi-va-phi-van-chuyen.component.css"],
})
export class GetDiaChiVaPhiVanChuyenComponent implements OnInit {
  @Input({ required: true }) diaChiVaPhiVanChuyen? = new DiaChiVaPhiVanChuyen();
  @Output() diaChiVaPhiVanChuyenChange =
    new EventEmitter<DiaChiVaPhiVanChuyen>();
  @Output() phiVanChuyen = new EventEmitter<number>();
  tinhs: Array<any>;
  huyens: Array<any>;
  xas: Array<any>;
  constructor(private ghnService: GiaoHangNhanhService) {}
  ngOnInit(): void {
    this.getAllTinh();
  }
  onFinishChooseDiaChi() {
    this.diaChiVaPhiVanChuyen.xa = this.getTenXa();
    // console.log(this.diaChiVaPhiVanChuyen);
    this.getPhiVanChuyen();
    this.getThoiGianDuKien();
  }

  getAllTinh() {
    this.huyens = [];
    this.xas = [];
    this.ghnService.getAllProvince().subscribe({
      next: (resp) => {
        this.tinhs = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllHuyenByTinh() {
    this.xas = [];
    this.ghnService
      .getAllDistrictByProvinceID(this.diaChiVaPhiVanChuyen.tinhId)
      .subscribe({
        next: (resp) => {
          this.huyens = resp.data;
          this.diaChiVaPhiVanChuyen.tinh = this.getTenTinh();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllXaByHuyen() {
    this.ghnService
      .getAllWardByDistrictID(this.diaChiVaPhiVanChuyen.huyenId)
      .subscribe({
        next: (resp) => {
          this.xas = resp.data;
          this.diaChiVaPhiVanChuyen.huyen = this.getTenHuyen();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getTenTinh(): string {
    let provinceName = "";
    this.tinhs.forEach((t) => {
      if (t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId) {
        provinceName = t.ProvinceName;
      }
    });
    return provinceName;
  }
  getTenHuyen(): string {
    let districtName = "";
    this.huyens.forEach((t) => {
      if (t.DistrictID == this.diaChiVaPhiVanChuyen.huyenId) {
        districtName = t.DistrictName;
      }
    });
    return districtName;
  }
  getTenXa(): string {
    let wardName = "";
    this.xas.forEach((t) => {
      if (t.WardCode == this.diaChiVaPhiVanChuyen.xaCode) {
        wardName = t.WardName;
      }
    });
    return wardName;
  }

  getThoiGianDuKien() {
    this.ghnService
      .getExpectedDeliveryTime(this.diaChiVaPhiVanChuyen)
      .subscribe({
        next: (resp) => {
          this.diaChiVaPhiVanChuyen.duKien = new Date(
            resp.data.leadtime * 1000
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getPhiVanChuyen() {
    let service_id = null;
    let shopId = 190872;
    let from_district = 3440; // Xuân Phương - Nam từ liêm
    this.ghnService
      .getService(shopId, from_district, this.diaChiVaPhiVanChuyen.huyenId)
      .subscribe({
        next: (resp: any) => {
          service_id = Number(resp.data[0].service_id);
          this.ghnService
            .getFee(this.diaChiVaPhiVanChuyen, service_id)
            .subscribe({
              next: (resp) => {
                this.diaChiVaPhiVanChuyen.phiVanChuyen = resp.data.total;
                this.phiVanChuyen.emit(resp.data.total);
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log("Lỗi lấy service từ bên giao hàng");
          console.log(err);
        },
      });
  }

  clear() {}
}

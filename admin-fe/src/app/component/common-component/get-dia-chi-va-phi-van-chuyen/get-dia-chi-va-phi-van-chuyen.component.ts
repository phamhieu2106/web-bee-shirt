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
export class GetDiaChiVaPhiVanChuyenComponent implements OnInit, OnChanges {
  @Input({ required: true }) diaChiVaPhiVanChuyen? = new DiaChiVaPhiVanChuyen();
  @Output() diaChiVaPhiVanChuyenChange =
    new EventEmitter<DiaChiVaPhiVanChuyen>();
  tinhs: Array<any>;
  huyens: Array<any>;
  xas: Array<any>;
  constructor(private ghnService: GiaoHangNhanhService) {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    this.getAllTinh();
  }
  onFinishChooseDiaChi() {
    this.diaChiVaPhiVanChuyen.xa = this.getTenXa();
    console.log(this.diaChiVaPhiVanChuyen);
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
          console.log(resp);
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
    this.ghnService.getFee(this.diaChiVaPhiVanChuyen).subscribe({
      next: (resp) => {
        // console.log(resp);
        this.diaChiVaPhiVanChuyen.phiVanChuyen = resp.data.total;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

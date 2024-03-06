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
  @Output() phiVanChuyen = new EventEmitter<number>();
  tinhs: any[];
  huyens: any[];
  xas: any[];
  constructor(private ghnService: GiaoHangNhanhService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["diaChiVaPhiVanChuyen"] &&
      !this.diaChiVaPhiVanChuyenIsEmpty()
    ) {
      // Fill data khi có dữ liệu
      this.fillData();
    }
  }
  ngOnInit(): void {
    if (this.diaChiVaPhiVanChuyenIsEmpty()) {
      this.getAllTinh();
    }
  }
  fillData() {
    // get all tỉnh => lọc ds tìm tinhId
    this.getAllTinh();
    setTimeout(() => this.findTinhId(), 100);

    // get all huyện => lọc danh sách tìm xaId
    setTimeout(() => this.getAllHuyenByTinh(), 200);
    setTimeout(() => this.findHuyenId(), 400);

    // get all xã
    setTimeout(() => this.getAllXaByHuyen(), 600);
    setTimeout(() => this.findXaId(), 800);

    // Get phi van chuyen va thoi gian du kien giao
    setTimeout(() => this.onFinishChooseDiaChi(), 1000);
  }
  findXaId() {
    for (let i = 0; i < this.xas.length; i++) {
      const element = this.xas[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.xa)) {
        this.diaChiVaPhiVanChuyen.xaCode = element.WardCode;
        console.log(element);
        break;
      }
    }
  }
  findHuyenId() {
    console.log("find huyen");

    for (let i = 0; i < this.huyens.length; i++) {
      const element = this.huyens[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.huyen)) {
        this.diaChiVaPhiVanChuyen.huyenId = element.DistrictID;
        console.log(element);

        break;
      }
    }
  }
  findTinhId() {
    console.log("find tinh");
    for (let i = 0; i < this.tinhs.length; i++) {
      const element = this.tinhs[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.tinh)) {
        this.diaChiVaPhiVanChuyen.tinhId = element.ProvinceID;
        break;
      }
    }
  }

  diaChiVaPhiVanChuyenIsEmpty(): boolean {
    return (
      this.diaChiVaPhiVanChuyen.tinh == null &&
      this.diaChiVaPhiVanChuyen.huyen == null &&
      this.diaChiVaPhiVanChuyen.xa == null
    );
  }
  onFinishChooseDiaChi() {
    this.diaChiVaPhiVanChuyen.xa = this.getTenXa();
    // console.log(this.diaChiVaPhiVanChuyen);
    this.getPhiVanChuyen();
    this.getThoiGianDuKien();
  }

  getAllTinh() {
    console.log("get tinh");

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
          console.log("get huyen");
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllXaByHuyen() {
    console.log("get xa");

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
    let provinceName = this.diaChiVaPhiVanChuyen.tinh;
    if (provinceName == null || provinceName == "") {
      this.tinhs.forEach((t) => {
        if (t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId) {
          provinceName = t.ProvinceName;
        }
      });
    }
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

  clear() {
    this.tinhs = [];
    this.xas = [];
    this.huyens = [];
    this.diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
  }
}
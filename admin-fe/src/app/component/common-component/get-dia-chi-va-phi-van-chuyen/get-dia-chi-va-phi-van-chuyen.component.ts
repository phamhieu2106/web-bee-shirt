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
  TrackByFunction,
} from "@angular/core";

@Component({
  selector: "app-get-dia-chi-va-phi-van-chuyen",
  templateUrl: "./get-dia-chi-va-phi-van-chuyen.component.html",
  styleUrls: ["./get-dia-chi-va-phi-van-chuyen.component.css"],
})
export class GetDiaChiVaPhiVanChuyenComponent implements OnInit, OnChanges {
  @Input() diaChiVaPhiVanChuyen: DiaChiVaPhiVanChuyen;
  @Output() diaChiVaPhiVanChuyenChange =
    new EventEmitter<DiaChiVaPhiVanChuyen>();
  @Output() changePhiVanChuyen = new EventEmitter<number>();
  tinhs: any[];
  huyens: any[];
  xas: any[];
  isFillData = false;

  public isLoadding = false;
  public overlayText = "Đang tính toán";

  constructor(private ghnService: GiaoHangNhanhService) {
    this.getAllTinh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["diaChiVaPhiVanChuyen"]) {
      if (!this.diaChiVaPhiVanChuyenIsEmpty()) {
        this.fillData();
      }
    }
  }

  ngOnInit(): void {}

  async fillData() {
    this.isFillData = true;
    try {
      await this.turnOnOverlay("Vui lòng chờ vài giây ...");

      // Tìm Tỉnh, Huyện, Xã
      await this.findTinhId();
      await this.getAllHuyenByTinh();
      await this.findHuyenId();
      await this.getAllXaByHuyen();
      await this.findXaId();

      // Xử lý hoàn thành
      await this.onFinishChooseDiaChi();

      this.turnOffOverlay("");
    } catch (error) {
      console.log("Lỗi trong fillData:", error);
      this.turnOffOverlay("Có lỗi xảy ra");
    }
  }

  async findTinhId() {
    const tinh = this.tinhs.find(
      (element) => element.ProvinceName === this.diaChiVaPhiVanChuyen.tinh
    );
    if (tinh) {
      this.diaChiVaPhiVanChuyen.tinhId = tinh.ProvinceID;
    }
  }

  async findHuyenId() {
    const huyen = this.huyens.find(
      (element) => element.DistrictName === this.diaChiVaPhiVanChuyen.huyen
    );
    if (huyen) {
      this.diaChiVaPhiVanChuyen.huyenId = huyen.DistrictID;
    }
  }

  async findXaId() {
    const xa = this.xas.find(
      (element) => element.WardName === this.diaChiVaPhiVanChuyen.xa
    );
    if (xa) {
      this.diaChiVaPhiVanChuyen.xaCode = xa.WardCode;
    }
  }

  diaChiVaPhiVanChuyenIsEmpty(): boolean {
    return (
      this.diaChiVaPhiVanChuyen.tinh == null &&
      this.diaChiVaPhiVanChuyen.huyen == null &&
      this.diaChiVaPhiVanChuyen.xa == null
    );
  }

  async onFinishChooseDiaChi() {
    try {
      this.diaChiVaPhiVanChuyen.xa = this.getTenXa();
      await this.getPhiVanChuyen();
      await this.getThoiGianDuKien();
    } catch (error) {
      console.log("Lỗi trong onFinishChooseDiaChi:", error);
    }
  }

  async getAllTinh() {
    try {
      const resp = await this.ghnService.getAllProvince().toPromise();
      this.tinhs = resp.data;
      if (this.diaChiVaPhiVanChuyen.tinh) {
        await this.findTinhId();
      }
    } catch (error) {
      console.log("Lỗi trong getAllTinh:", error);
    }
  }

  async getAllHuyenByTinh() {
    this.xas = [];
    try {
      const resp = await this.ghnService
        .getAllDistrictByProvinceID(this.diaChiVaPhiVanChuyen.tinhId)
        .toPromise();
      this.huyens = resp.data;

      this.diaChiVaPhiVanChuyen.tinh = this.getTenTinh();
      if (!this.isFillData) {
        // // reset value tinh, xa
        this.diaChiVaPhiVanChuyen.xa = null;
        this.diaChiVaPhiVanChuyen.xaCode = "";
        this.diaChiVaPhiVanChuyen.huyen = null;
        this.diaChiVaPhiVanChuyen.huyenId = -1;
      }
      this.diaChiVaPhiVanChuyenChange.emit(this.diaChiVaPhiVanChuyen);
    } catch (error) {
      console.log("Lỗi trong getAllHuyenByTinh:", error);
    }
  }

  async getAllXaByHuyen() {
    try {
      const resp = await this.ghnService
        .getAllWardByDistrictID(this.diaChiVaPhiVanChuyen.huyenId)
        .toPromise();
      this.xas = resp.data;
      this.diaChiVaPhiVanChuyen.huyen = this.getTenHuyen();
      if (!this.isFillData) {
        // // reset value tinh, xa
        this.diaChiVaPhiVanChuyen.xa = null;
        this.diaChiVaPhiVanChuyen.xaCode = "";
      }
      this.diaChiVaPhiVanChuyenChange.emit(this.diaChiVaPhiVanChuyen);
    } catch (error) {
      console.log("Lỗi trong getAllXaByHuyen:", error);
    }
  }

  getTenTinh(): string {
    const tinh = this.tinhs.find(
      (t) => t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId
    );

    return tinh?.ProvinceName ? tinh.ProvinceName : "";
  }

  getTenHuyen(): string {
    const huyen = this.huyens.find(
      (t) => t.DistrictID == this.diaChiVaPhiVanChuyen.huyenId
    );
    return huyen?.DistrictName ? huyen.DistrictName : "";
  }

  getTenXa(): string {
    const xa = this.xas.find(
      (t) => t.WardCode == this.diaChiVaPhiVanChuyen.xaCode
    );
    return xa?.WardName ? xa.WardName : "";
  }

  async getThoiGianDuKien() {
    try {
      const resp = await this.ghnService
        .getExpectedDeliveryTime(this.diaChiVaPhiVanChuyen)
        .toPromise();
      this.diaChiVaPhiVanChuyen.duKien = new Date(resp.data.leadtime * 1000);
    } catch (error) {
      console.log("Lỗi trong getThoiGianDuKien:", error);
    }
  }

  async getPhiVanChuyen() {
    this.turnOnOverlay("Vui lòng chờ");
    try {
      const shopId = 190872;
      const from_district = 3440; // Xuân Phương - Nam từ Liêm
      const respService = await this.ghnService
        .getService(shopId, from_district, this.diaChiVaPhiVanChuyen.huyenId)
        .toPromise();

      const service_id = respService.data[0].service_id;
      this.diaChiVaPhiVanChuyen.service_id = service_id;

      const respFee = await this.ghnService
        .getFee(this.diaChiVaPhiVanChuyen, service_id)
        .toPromise();
      this.diaChiVaPhiVanChuyen.phiVanChuyen = respFee.data.total;
      this.changePhiVanChuyen.emit(respFee.data.total);
      this.diaChiVaPhiVanChuyenChange.emit(this.diaChiVaPhiVanChuyen);
      this.turnOffOverlay("Hoàn thành");
    } catch (error) {
      console.log("Lỗi trong getPhiVanChuyen:", error);
    }
  }

  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  trackByHuyen(index: number, item: any) {
    return item.DistrictID; // Trả về DistrictID của quận
  }
  trackByXa(index: number, item: any) {
    return item.WardCode; // Trả về WardCode của quận
  }

  setIsFillData(arg0: boolean) {
    this.isFillData = arg0;
  }
}

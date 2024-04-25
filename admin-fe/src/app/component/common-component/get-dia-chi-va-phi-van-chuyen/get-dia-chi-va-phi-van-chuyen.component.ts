// import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
// import { DiaChiVaPhiVanChuyen } from "./../../../model/class/dia-chi-va-phi-van-chuyen.class";
// import {
//   Component,
//   EventEmitter,
//   Input,
//   OnChanges,
//   OnInit,
//   Output,
//   SimpleChanges,
// } from "@angular/core";

// @Component({
//   selector: "app-get-dia-chi-va-phi-van-chuyen",
//   templateUrl: "./get-dia-chi-va-phi-van-chuyen.component.html",
//   styleUrls: ["./get-dia-chi-va-phi-van-chuyen.component.css"],
// })
// export class GetDiaChiVaPhiVanChuyenComponent implements OnInit, OnChanges {
//   @Input({ required: true }) diaChiVaPhiVanChuyen: DiaChiVaPhiVanChuyen;
//   @Output() diaChiVaPhiVanChuyenChange =
//     new EventEmitter<DiaChiVaPhiVanChuyen>();
//   @Output() changePhiVanChuyen = new EventEmitter<number>();
//   tinhs: any[];
//   huyens: any[];
//   xas: any[];

//   public isLoadding = false;
//   public overlayText = "Đang tính toán";
//   constructor(private ghnService: GiaoHangNhanhService) {
//     this.getAllTinh();
//   }
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes["diaChiVaPhiVanChuyen"]) {
//       if (!this.diaChiVaPhiVanChuyenIsEmpty()) {
//         // Fill data khi truyền dữ liệu
//         this.fillData();
//       }
//     }
//   }
//   ngOnInit(): void {}
//   async fillData() {
//     await this.turnOnOverlay("Vui lòng chờ vài giây ...");

//     // Tìm Tỉnh, Huyện, Xã
//     await this.findTinhId();
//     await this.getAllHuyenByTinh();
//     await this.findHuyenId();
//     await this.getAllXaByHuyen();
//     await this.findXaId();

//     // Xử lý hoàn thành
//     await this.onFinishChooseDiaChi();

//     await this.turnOffOverlay("");
//   }
//   async findXaId() {
//     await new Promise<void>((resolve, reject) => {
//       for (let i = 0; i < this.xas.length; i++) {
//         const element = this.xas[i];
//         if (element.WardName == this.diaChiVaPhiVanChuyen.xa) {
//           this.diaChiVaPhiVanChuyen.xaCode = element.WardCode;
//           break;
//         }
//       }
//       resolve();
//     });
//   }
//   async findHuyenId() {
//     await new Promise<void>((resolve, reject) => {
//       for (let i = 0; i < this.huyens.length; i++) {
//         const element = this.huyens[i];
//         if (element.DistrictName == this.diaChiVaPhiVanChuyen.huyen) {
//           this.diaChiVaPhiVanChuyen.huyenId = element.DistrictID;
//           break;
//         }
//       }
//       resolve();
//     });
//   }
//   async findTinhId() {
//     await new Promise<void>((resolve, reject) => {
//       for (let i = 0; i < this.tinhs.length; i++) {
//         const element = this.tinhs[i];
//         if (element.ProvinceName == this.diaChiVaPhiVanChuyen.tinh) {
//           this.diaChiVaPhiVanChuyen.tinhId = element.ProvinceID;
//           break;
//         }
//       }
//       resolve();
//     });
//   }

//   diaChiVaPhiVanChuyenIsEmpty(): boolean {
//     return (
//       this.diaChiVaPhiVanChuyen.tinh == null &&
//       this.diaChiVaPhiVanChuyen.huyen == null &&
//       this.diaChiVaPhiVanChuyen.xa == null
//     );
//   }
//   async onFinishChooseDiaChi() {
//     await new Promise<void>((resolve, reject) => {
//       this.diaChiVaPhiVanChuyen.xa = this.getTenXa();
//       // console.log(this.diaChiVaPhiVanChuyen);
//       this.getPhiVanChuyen();
//       this.getThoiGianDuKien();
//       resolve();
//     });
//   }

//   getAllTinh() {
//     this.huyens = [];
//     this.xas = [];
//     this.ghnService.getAllProvince().subscribe({
//       next: (resp) => {
//         this.tinhs = resp.data;
//         if (this.diaChiVaPhiVanChuyen.tinh) {
//           setTimeout(() => {
//             this.findTinhId();
//           }, 100);
//         }
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }

//   async getAllHuyenByTinh() {
//     await new Promise<void>((resolve, reject) => {
//       this.xas = [];
//       this.ghnService
//         .getAllDistrictByProvinceID(this.diaChiVaPhiVanChuyen.tinhId)
//         .subscribe({
//           next: (resp) => {
//             this.huyens = resp.data;
//             this.diaChiVaPhiVanChuyen.tinh = this.getTenTinh();
//           },
//           error: (err) => {
//             console.log(err);
//           },
//         });
//       resolve();
//     });
//   }

//   async getAllXaByHuyen() {
//     await new Promise<void>((resolve, reject) => {
//       this.ghnService
//         .getAllWardByDistrictID(this.diaChiVaPhiVanChuyen.huyenId)
//         .subscribe({
//           next: (resp) => {
//             this.xas = resp.data;
//             this.diaChiVaPhiVanChuyen.huyen = this.getTenHuyen();
//           },
//           error: (err) => {
//             console.log(err);
//           },
//         });
//       resolve();
//     });
//   }

//   getTenTinh(): string {
//     let provinceName = this.diaChiVaPhiVanChuyen.tinh;
//     if (provinceName == null || provinceName == "") {
//       this.tinhs.forEach((t) => {
//         if (t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId) {
//           provinceName = t.ProvinceName;
//         }
//       });
//     }
//     return provinceName;
//   }
//   getTenHuyen(): string {
//     let districtName = "";
//     this.huyens.forEach((t) => {
//       if (t.DistrictID == this.diaChiVaPhiVanChuyen.huyenId) {
//         districtName = t.DistrictName;
//       }
//     });
//     return districtName;
//   }
//   getTenXa(): string {
//     let wardName = "";
//     this.xas.forEach((t) => {
//       if (t.WardCode == this.diaChiVaPhiVanChuyen.xaCode) {
//         wardName = t.WardName;
//       }
//     });
//     return wardName;
//   }

//   getThoiGianDuKien() {
//     this.ghnService
//       .getExpectedDeliveryTime(this.diaChiVaPhiVanChuyen)
//       .subscribe({
//         next: (resp) => {
//           this.diaChiVaPhiVanChuyen.duKien = new Date(
//             resp.data.leadtime * 1000
//           );
//         },
//         error: (err) => {
//           console.log(err);
//         },
//       });
//   }
//   getPhiVanChuyen() {
//     let service_id = null;
//     let shopId = 190872;
//     let from_district = 3440; // Xuân Phương - Nam từ liêm
//     this.ghnService
//       .getService(shopId, from_district, this.diaChiVaPhiVanChuyen.huyenId)
//       .subscribe({
//         next: (resp: any) => {
//           service_id = Number(resp.data[0].service_id);
//           this.diaChiVaPhiVanChuyen.service_id = resp.data[0].service_id;
//           this.ghnService
//             .getFee(this.diaChiVaPhiVanChuyen, service_id)
//             .subscribe({
//               next: (resp) => {
//                 this.diaChiVaPhiVanChuyen.phiVanChuyen = resp.data.total;
//                 this.changePhiVanChuyen.emit(resp.data.total);
//               },
//               error: (err) => {
//                 console.log(err);
//               },
//             });
//         },
//         error: (err) => {
//           console.log("Lỗi lấy service từ bên giao hàng");
//           console.log(err);
//         },
//       });
//   }

//   // 14
//   private async turnOnOverlay(text: string) {
//     await new Promise<void>((resolve, reject) => {
//       this.overlayText = text;
//       this.isLoadding = true;
//       resolve();
//     });
//   }

//   // 15
//   private async turnOffOverlay(text: string) {
//     await new Promise<void>((resolve, reject) => {
//       this.overlayText = text;
//       this.isLoadding = false;
//       resolve();
//     });
//   }
// }

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
    try {
      const resp = await this.ghnService
        .getAllDistrictByProvinceID(this.diaChiVaPhiVanChuyen.tinhId)
        .toPromise();
      this.huyens = resp.data;
      this.diaChiVaPhiVanChuyen.tinh = this.getTenTinh();
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
    } catch (error) {
      console.log("Lỗi trong getAllXaByHuyen:", error);
    }
  }

  getTenTinh(): string {
    let provinceName = this.diaChiVaPhiVanChuyen.tinh;
    if (provinceName == null || provinceName == "") {
      const tinh = this.tinhs.find(
        (t) => t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId
      );
      if (tinh) {
        provinceName = tinh.ProvinceName;
      }
    }
    return provinceName;
  }

  getTenHuyen(): string {
    let districtName = "";
    const huyen = this.huyens.find(
      (t) => t.DistrictID == this.diaChiVaPhiVanChuyen.huyenId
    );
    if (huyen) {
      districtName = huyen.DistrictName;
    }
    return districtName;
  }

  getTenXa(): string {
    let wardName = "";
    const xa = this.xas.find(
      (t) => t.WardCode == this.diaChiVaPhiVanChuyen.xaCode
    );
    if (xa) {
      wardName = xa.WardName;
    }
    return wardName;
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
}

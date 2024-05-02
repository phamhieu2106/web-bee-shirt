import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import Swal, { SweetAlertResult } from "sweetalert2";

import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { CoAo } from "src/app/model/class/co-ao.class";
import { KichCo } from "src/app/model/class/kich-co.class";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { TayAo } from "src/app/model/class/tay-ao.class";
import { FilterSPCTParams } from "src/app/model/interface/filter-spct-params.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ProductDiscountResponse } from "src/app/model/interface/product-discount-response";
import { ChatLieuService } from "src/app/service/chat-lieu.service";
import { KichCoService } from "src/app/service/kick-co.service";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";
import { KieuDangService } from "src/app/service/kieu-dang.service";
import { KieuTayAoService } from "src/app/service/kieu-tay-ao.service";
import { KieuThietKeService } from "src/app/service/kieu-thiet-ke.service";
import { MauSacService } from "src/app/service/mau-sac.service";
import { NotificationService } from "src/app/service/notification.service";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamService } from "src/app/service/san-pham.service";
import { UpdateNhanhSPCT } from "src/app/model/interface/update-nhanh-spct.interface";

@Component({
  selector: "app-ds-san-pham-chi-tiet",
  templateUrl: "./ds-san-pham-chi-tiet.component.html",
  styleUrls: ["./ds-san-pham-chi-tiet.component.css"],
})
export class DsSanPhamChiTietComponent {
  public isLoadding = false;
  public overlayText: string = "";

  public addForm: FormGroup;
  public content: string;
  public pagedResponse: PagedResponse<SanPhamChiTiet>;
  public sanPham: SanPham;

  public mauSacs: MauSac[] = [];
  public kichCos: KichCo[] = [];
  public kieuDangs: KieuDang[] = [];
  public thietKes: KieuThietKe[] = [];
  public tayAos: TayAo[] = [];
  public coAos: CoAo[] = [];
  public chatLieus: ChatLieu[] = [];
  public minAndMaxPrice: number[] = [];

  public selectedKichCoId: number = 0;
  public selectedKieuDangId: number = 0;
  public selectedThietKeId: number = 0;
  public selectedTayAoId: number = 0;
  public selectedCoAoId: number = 0;
  public selectedChatLieuId: number = 0;
  public minPrice: number;
  public maxPrice: number;

  public updateForm: FormGroup;
  public updateCommonPropertiesForm: FormGroup;
  public changeableMinPrice: number;
  public changeableMaxPrice: number;

  public selectedImgFileList: File[] = [];
  public uploadImgFileList: File[] = [];
  public currentMauSacId: number = 0;

  filterParams: FilterSPCTParams = {
    pageNumber: 1,
    pageSize: 5,
    minPrice: 0,
    maxPrice: 0,
    productId: 0,
    colorId: null,
    sizeId: null,
  };

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private spctService: SanPhamChiTietService,
    private sanPhamService: SanPhamService,
    private mauSacService: MauSacService,
    private kichCoService: KichCoService,
    private kieuDangService: KieuDangService,
    private kieuThietKeService: KieuThietKeService,
    private kieuTayAoService: KieuTayAoService,
    private kieuCoAoService: KieuCoAoService,
    private chatLieuService: ChatLieuService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Đang tải...");

    this.getProdAndMinMaxPrice();
    this.getAllMauSac();
    this.getAllKichCo();
    this.getAllKieuDang();
    this.getAllThietKe();
    this.getAllTayAo();
    this.getAllCoAo();
    this.getAllChatLieu();
    this.initUpdateForm();
    this.initUpdateCommonPropertiesForm();

    setTimeout(() => {
      this.turnOffOverlay("");
    }, 500);
  }

  // public functions
  // 1
  public formatCurrency(amount: number): string {
    return this.currencyPipe.transform(amount, "VND", "symbol", "1.0-0");
  }

  // 2
  public onSelectField(event: any, field: string): void {
    if (event.target.value === "0") {
      this.filterParams[`${field}`] = null;
    } else {
      this.filterParams[`${field}`] = event.target.value;
    }
    this.getProDetailsByFilterParams();
  }

  // 3
  public goToPage(newPageNumber: number): void {
    this.filterParams.pageNumber = newPageNumber;
    this.getProDetailsByFilterParams();

    const ckBoxAll = document.getElementById("ckBoxAll") as HTMLInputElement;
    ckBoxAll.checked = false;
  }

  // 4
  public selectAllRows(): void {
    const ckBoxAll = document.getElementById(`ckBoxAll`) as HTMLInputElement;
    const selectedCkBoxs = document.querySelectorAll(`.ckBoxForUpdate`);

    for (let i = 0; i < selectedCkBoxs.length; i++) {
      const ckBox = selectedCkBoxs[i] as HTMLInputElement;
      ckBox.checked = ckBoxAll.checked;
    }
  }

  // 5
  public isUpdateBtnHidden(): boolean {
    const selectedCkBoxs = document.querySelectorAll(`.ckBoxForUpdate`);

    for (let i = 0; i < selectedCkBoxs.length; i++) {
      const ckBox = selectedCkBoxs[i] as HTMLInputElement;
      if (ckBox.checked) {
        return true;
      }
    }
    return false;
  }

  // 6
  public checkSelectedRow(rowId: string): boolean {
    const selectedCkBox = document.getElementById(`${rowId}`);
    if (!selectedCkBox) {
      return false;
    }

    const ckBox = selectedCkBox as HTMLInputElement;
    return ckBox.checked ? true : false;
  }

  // 7
  public onCheckboxChange(index: number): void {
    const row = document.getElementById(`row${index}`);
    const ckBox = document.getElementById(`ckBoxForUpdate${index}`);

    if (row) {
      if (!(ckBox as HTMLInputElement).checked) {
        row.classList.remove("table-active");
      } else {
        row.classList.add("table-active");
      }
    }
  }

  // 8
  public formatNumber(event: any, inputNameId: string): void {
    let value = event.target.value;
    if (value === "") {
      (document.getElementById(inputNameId) as HTMLInputElement).value = "0";
      return;
    }
    value = value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("en-US");
    (document.getElementById(inputNameId) as HTMLInputElement).value = value;
  }

  // 9
  public quickUpdate(pageSize: number): void {
    Swal.fire({
      title: "Cập nhật nhanh?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const ids: number[] = [];
        const giaNhaps: number[] = [];
        const giaBans: number[] = [];
        const soLuongs: number[] = [];

        for (let i = 0; i < pageSize; i++) {
          const ckBox = document.getElementById(
            `ckBoxForUpdate${i}`
          ) as HTMLInputElement;
          if (ckBox.checked) {
            const idValue = (
              document.getElementById(`id${i}`) as HTMLInputElement
            ).value;
            const giaNhapValue = (
              document.getElementById(`giaNhap${i}`) as HTMLInputElement
            ).value.replaceAll(",", "");
            const giaBanValue = (
              document.getElementById(`giaBan${i}`) as HTMLInputElement
            ).value.replaceAll(",", "");
            const soLuongValue = (
              document.getElementById(`soLuong${i}`) as HTMLInputElement
            ).value.replaceAll(",", "");
            ids.push(parseInt(idValue));
            giaNhaps.push(parseInt(giaNhapValue));
            giaBans.push(parseInt(giaBanValue));
            soLuongs.push(parseInt(soLuongValue));
            const updateNhanhReq: UpdateNhanhSPCT = {
              ids: ids,
              giaNhaps: giaNhaps,
              giaBans: giaBans,
              soLuongs: soLuongs,
            };
            this.spctService.quickUpdate(updateNhanhReq).subscribe({
              next: () => {
                this.getProdAndMinMaxPrice();
                this.notifService.success("Cập nhật nhanh thành công");
              },
              error: (errResp: HttpErrorResponse) => {
                this.notifService.error(errResp.error.message);
              },
            });
            ckBox.checked = false;
          }
        }
      }
    });
  }

  // 10
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      sanPhamId: new FormControl(this.sanPham?.id),
      mauSacId: new FormControl(0, [Validators.required]),
      kichCoId: new FormControl(0, [Validators.required]),
      giaNhap: new FormControl(0, [Validators.required]),
      giaBan: new FormControl(0, [Validators.required]),
      soLuong: new FormControl(0, [Validators.required]),
    });
  }

  private initUpdateCommonPropertiesForm(): void {
    this.updateCommonPropertiesForm = new FormGroup({
      sanPhamId: new FormControl(this.sanPham?.id),
      kieuDangId: new FormControl(0, [Validators.required]),
      thietKeId: new FormControl(0, [Validators.required]),
      tayAoId: new FormControl(0, [Validators.required]),
      coAoId: new FormControl(0, [Validators.required]),
      chatLieuId: new FormControl(0, [Validators.required]),
    });
  }

  // 11
  public selectUpdateSPCT(spctId: number): void {
    this.spctService.getOneById(spctId).subscribe({
      next: (response: SanPhamChiTiet) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          sanPhamId: new FormControl(this.sanPham?.id),
          mauSacId: new FormControl(response.mauSac.id, [Validators.required]),
          kichCoId: new FormControl(response.kichCo.id, [Validators.required]),
          giaNhap: new FormControl(response.giaNhap, [Validators.required]),
          giaBan: new FormControl(response.giaBan, [Validators.required]),
          soLuong: new FormControl(response.soLuongTon, [Validators.required]),
        });
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 12
  public updateSpct(): void {
    Swal.fire({
      title: "Cập nhật SPCT?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        // replace comma
        const giaNhap = (
          document.getElementById(`giaNhapInput`) as HTMLInputElement
        ).value.replaceAll(",", "");
        const giaBan = (
          document.getElementById(`giaBanInput`) as HTMLInputElement
        ).value.replaceAll(",", "");
        const soLuong = (
          document.getElementById(`soLuongInput`) as HTMLInputElement
        ).value.replaceAll(",", "");

        this.updateForm.get("giaNhap")?.setValue(giaNhap);
        this.updateForm.get("giaBan")?.setValue(giaBan);
        this.updateForm.get("soLuong")?.setValue(soLuong);

        this.spctService.update(this.updateForm.value).subscribe({
          next: (response: string) => {
            this.notifService.success(response);
            this.getProdAndMinMaxPrice();
            document.getElementById("closeUpdateBtn").click();
          },
          error: (errResp: HttpErrorResponse) => {
            const message = JSON.parse(errResp.error).message;
            this.notifService.error(message);
          },
        });
      }
    });
  }

  // 13
  public changePageSize(e: any): void {
    this.filterParams.pageNumber = 1;
    this.filterParams.pageSize = e.target.value;
    this.getProDetailsByFilterParams();
  }

  // 14
  public openModalChinhSuaAnh(spctId: number, mauSacId: number): void {
    document.getElementById("triggerUpdateAnhModal").click();
    this.currentMauSacId = mauSacId;
  }

  // 15
  public openInputUpdateImg(): void {
    document.getElementById("inputUpdateImg").click();
  }

  // 16
  public changeFileInputAndShowThumbnail(event: any): void {
    for (let i = 0; i < event.target["files"].length; i++) {
      let currentFile = event.target["files"][i];
      if (!this.checkUploadImage(currentFile.name, this.uploadImgFileList)) {
        this.uploadImgFileList.push(currentFile);
      }
    }

    // show list ảnh vừa được chọn
    for (let i = 0; i < this.uploadImgFileList.length; i++) {
      this.showImageThumbnail(this.uploadImgFileList[i], `uploadImg${i}`);
    }
  }

  // 17
  public isUploadImgChecked(fileName: string): boolean {
    for (let i = 0; i < this.selectedImgFileList.length; i++) {
      if (this.selectedImgFileList[i].name === fileName) {
        return true;
      }
    }
    return false;
  }

  // 18
  public toggleUploadImage(chkBoxIndex: number, file: File, event: any): void {
    const isChecked = event.target.checked;
    if (this.selectedImgFileList.length === 5 && isChecked) {
      this.notifService.warning("Không chọn quá 5 ảnh!");

      const currentCheckbox = document.getElementById(
        `chkBoxUploadImg${chkBoxIndex}`
      ) as HTMLInputElement;
      currentCheckbox.checked = !currentCheckbox.checked;
      return;
    }

    if (isChecked) {
      this.selectedImgFileList.push(file);
    } else {
      this.selectedImgFileList = this.selectedImgFileList.filter(
        (item: File) => item.name !== file.name
      );
    }

    // show ảnh
    for (let i = 0; i < this.selectedImgFileList.length; i++) {
      this.showImageThumbnail(this.selectedImgFileList[i], `selectedImg2${i}`);
    }
  }

  // 19
  public updateAnhSpct(): void {
    Swal.fire({
      title: "Cập nhật ảnh sản phẩm?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        if (this.selectedImgFileList.length > 0) {
          this.turnOnOverlay("Đang cập nhật...");
          this.spctService
            .updateImages(
              this.selectedImgFileList,
              this.sanPham.id,
              this.currentMauSacId
            )
            .subscribe({
              next: (response: any) => {
                this.notifService.success(response);
                this.getProDetailsByFilterParams();
                this.selectedImgFileList = [];
                this.uploadImgFileList = [];
                document.getElementById("closeUpdateImgBtn").click();
                this.turnOffOverlay("");
              },
              error: (errResp: HttpErrorResponse) => {
                this.notifService.error(errResp.error.message);
                this.turnOffOverlay("");
              },
            });
        } else {
          this.notifService.error("Bạn chưa chọn ảnh!");
        }
      }
    });
  }

  // 20
  public updateCommonProperties(): void {
    Swal.fire({
      title: "Cập nhật thuộc tính sản phẩm?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.spctService
          .updateCommonProperties(this.updateCommonPropertiesForm.value)
          .subscribe({
            next: () => {
              this.notifService.success("Cập nhật thành công!");
              this.getProDetailsByFilterParams();
              document
                .getElementById("closeUpdateCommonPropertiesModalBtn")
                .click();
            },
            error: (errResp: HttpErrorResponse) => {},
          });
      }
    });
  }

  // private functions
  // 1
  private getProdAndMinMaxPrice(): void {
    this.activatedRoute.params.subscribe((params) => {
      let productId = params["sanPhamId"];
      this.filterParams.productId = productId;

      // get sp by ID
      this.sanPhamService.getById(productId).subscribe({
        next: (prodResp: SanPham) => {
          this.sanPham = prodResp;
          this.updateForm.get("sanPhamId").setValue(prodResp.id);

          this.updateCommonPropertiesForm = new FormGroup({
            sanPhamId: new FormControl(prodResp.id),
            kieuDangId: new FormControl(
              prodResp.sanPhamChiTiets[0].kieuDang.id,
              [Validators.required]
            ),
            thietKeId: new FormControl(prodResp.sanPhamChiTiets[0].thietKe.id, [
              Validators.required,
            ]),
            tayAoId: new FormControl(prodResp.sanPhamChiTiets[0].tayAo.id, [
              Validators.required,
            ]),
            coAoId: new FormControl(prodResp.sanPhamChiTiets[0].coAo.id, [
              Validators.required,
            ]),
            chatLieuId: new FormControl(
              prodResp.sanPhamChiTiets[0].chatLieu.id,
              [Validators.required]
            ),
          });
        },
        error: (errResp: HttpErrorResponse) => {},
      });

      // get min price and max price in spctList of sp
      this.spctService.getMinAndMaxPrice(productId).subscribe({
        next: (response: number[]) => {
          this.minPrice = response[0];
          this.changeableMinPrice = response[0];
          this.maxPrice = response[1];
          this.changeableMaxPrice = response[1];
          this.minAndMaxPrice = response;

          // get spctList of sp
          this.getProDetailsByFilterParams();
        },
        error: (errResp: HttpErrorResponse) => {},
      });
    });
  }

  // 2
  private getAllMauSac(): void {
    this.mauSacService.getAll().subscribe({
      next: (response: MauSac[]) => {
        this.mauSacs = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 3
  private getAllKichCo(): void {
    this.kichCoService.getAll().subscribe({
      next: (response: KichCo[]) => {
        this.kichCos = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 4
  private getAllKieuDang(): void {
    this.kieuDangService.getAll().subscribe({
      next: (response: KieuDang[]) => {
        this.kieuDangs = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 5
  private getAllThietKe(): void {
    this.kieuThietKeService.getAll().subscribe({
      next: (response: KieuThietKe[]) => {
        this.thietKes = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 6
  private getAllTayAo(): void {
    this.kieuTayAoService.getAll().subscribe({
      next: (response: TayAo[]) => {
        this.tayAos = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 7
  private getAllCoAo(): void {
    this.kieuCoAoService.getAll().subscribe({
      next: (response: CoAo[]) => {
        this.coAos = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 8
  private getAllChatLieu(): void {
    this.chatLieuService.getAll().subscribe({
      next: (response: ChatLieu[]) => {
        this.chatLieus = response;
      },
      error: (errResp: HttpErrorResponse) => {},
    });
  }

  // 9
  private getProDetailsByFilterParams(): void {
    this.spctService.filterProDetailsByPage(this.filterParams).subscribe({
      next: (response: PagedResponse<SanPhamChiTiet>) => {
        this.pagedResponse = response;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
    this.getProductInDiscount(this.filterParams.productId);
  }

  // 10
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 11
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  // 12
  private checkUploadImage(fileName: string, curUploadImgFileList: File[]) {
    return curUploadImgFileList.some((file: File) => file.name === fileName);
  }

  // 13
  private showImageThumbnail(file: File, thumnailId: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById(thumnailId) as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Hiếu
  // Get Product In Discount
  public listProductInDiscount: ProductDiscountResponse[];
  private getProductInDiscount(id: number): void {
    this.sanPhamService.getListSanPhamChiTietInDiscount(id).subscribe({
      next: (value) => {
        this.listProductInDiscount = value;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  //
  public returnNewPrice(id: number, giaBan: number): number {
    if (this.listProductInDiscount && this.listProductInDiscount.length > 0) {
      const productInDiscount = this.listProductInDiscount.find(
        (product) => product.id === id
      );
      if (productInDiscount) {
        // Nếu sản phẩm có trong danh sách, tính toán giá bán mới dựa trên phần trăm giảm
        const phanTranGiam = productInDiscount.phanTramGiam;
        const giaBanMoi = giaBan * (1 - phanTranGiam / 100);
        return giaBanMoi; // Trả về giá bán mới
      }
    }
    return giaBan; // Nếu không tìm thấy sản phẩm hoặc mảng không được khởi tạo, trả về giá ban đầu
  }

  public isDiscounted(id: number): boolean {
    if (this.listProductInDiscount && this.listProductInDiscount.length > 0) {
      return this.listProductInDiscount.some((p) => p.id === id);
    }
    return false;
  }
}

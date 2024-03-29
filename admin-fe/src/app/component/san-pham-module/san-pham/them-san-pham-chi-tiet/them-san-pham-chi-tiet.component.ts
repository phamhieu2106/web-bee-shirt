import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";

import Swal, { SweetAlertResult } from "sweetalert2";

import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { CoAo } from "src/app/model/class/co-ao.class";
import { HinhAnh } from "src/app/model/class/hinh-anh.class";
import { KichCo } from "src/app/model/class/kich-co.class";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { TayAo } from "src/app/model/class/tay-ao.class";
import { AddSPCTRequest } from "src/app/model/interface/add-spct-request.interface";
import { AddSPCTSubRequest } from "src/app/model/interface/add-spct-sub-request.interface";
import { AddSpctValidation } from "src/app/model/interface/add-spct-validation.interface";
import { ColorSizeValidation } from "src/app/model/interface/color-size-validation.interface";
import { ChatLieuService } from "src/app/service/chat-lieu.service";
import { HinhAnhSanPhamService } from "src/app/service/hinh-anh-san-pham.service";
import { KichCoService } from "src/app/service/kick-co.service";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";
import { KieuDangService } from "src/app/service/kieu-dang.service";
import { KieuTayAoService } from "src/app/service/kieu-tay-ao.service";
import { KieuThietKeService } from "src/app/service/kieu-thiet-ke.service";
import { MauSacService } from "src/app/service/mau-sac.service";
import { NotificationService } from "src/app/service/notification.service";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-them-san-pham-chi-tiet",
  templateUrl: "./them-san-pham-chi-tiet.component.html",
  styleUrls: ["./them-san-pham-chi-tiet.component.css"],
})
export class ThemSanPhamChiTietComponent {
  public isLoadding = false;
  public overlayText: string = "";

  public curWorkingImgIndex: number;
  public selectedTenMauSac: string;
  public selectedIdMauSac: number;
  public addForm: FormGroup;
  public sanPham: SanPham;

  public selectedColorList: MauSac[] = [];
  public selectedSizeList: KichCo[] = [];

  // 7 danh sách các thuộc tính khả dụng của sản phẩm
  public activeForms: KieuDang[] = [];
  public activeDesigns: KieuThietKe[] = [];
  public activeSleeves: TayAo[] = [];
  public activeCollars: CoAo[] = [];
  public activeMaterials: ChatLieu[] = [];
  public activeColors: MauSac[] = [];
  public activeSizes: KichCo[] = [];

  public selectedImgFileList: File[][] = [];
  public curSelectedImgFileList: File[] = [];

  public existingImgList: HinhAnh[][] = [];
  public curExistingImgList: HinhAnh[] = [];

  public uploadedImgFileList: File[][] = [];
  public curUploadImgFileList: File[] = [];

  public commonService: any;
  public quickAddForm: FormGroup;
  public thuocTinhNhanh = {
    ten: "",
  };

  private chinhSuaBtnId: number;
  private services = [
    { ten: "kieuDangService", service: this.kieuDangService },
    { ten: "kieuThietKeService", service: this.kieuThietKeService },
    { ten: "kieuTayAoService", service: this.kieuTayAoService },
    { ten: "kieuCoAoService", service: this.kieuCoAoService },
    { ten: "chatLieuService", service: this.chatLieuService },
  ];

  public existSpct: SanPhamChiTiet;
  public validation: AddSpctValidation = {
    error: false,
    kieuDangId: false,
    thietKeId: false,
    tayAoId: false,
    coAoId: false,
    chatLieuId: false,
    giaAndSoLuong: [],
    anh: [],
  };
  public colorSizeValidations: ColorSizeValidation[] = [];

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanPhamService: SanPhamService,
    private kichCoService: KichCoService,
    private mauSacService: MauSacService,
    private kieuDangService: KieuDangService,
    private kieuThietKeService: KieuThietKeService,
    private kieuTayAoService: KieuTayAoService,
    private kieuCoAoService: KieuCoAoService,
    private chatLieuService: ChatLieuService,
    private hinhAnhSanPhamService: HinhAnhSanPhamService,
    private spctService: SanPhamChiTietService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initAddForm();
    this.initQuickAddForm();
    this.getProductByIdAndItsSpct();
    this.getPropertiesForSelectors();
  }

  // public functions
  // 1
  public selectColor(ms: MauSac): void {
    if (!this.selectedColorList.some((item: MauSac) => item.id === ms.id)) {
      this.selectedColorList.push(ms);
      this.selectedImgFileList.push([]);
      this.uploadedImgFileList.push([]);
      this.validation.giaAndSoLuong.push(false);
      this.addColorSizeValidation(ms.id, undefined, "color");
    }
  }

  // 2
  public selectSize(kc: KichCo): void {
    if (!this.selectedSizeList.some((item: KichCo) => item.id === kc.id)) {
      this.selectedSizeList.push(kc);
      this.addColorSizeValidation(undefined, kc.id, "size");
    }
  }

  // hàm 3 và 4 dùng để kiểm tra xem màu hoặc kích cỡ được chọn chưa để đánh dấu
  // 3
  public checkSelectedColor(color: MauSac): boolean {
    return this.selectedColorList.some((c: MauSac) => c.id === color.id);
  }

  // 4
  public checkSelectedSize(size: KichCo): boolean {
    return this.selectedSizeList.some((s: KichCo) => s.id === size.id);
  }

  // hàm 5 và 6 dùng để xóa màu hoặc cỡ khỏi danh sách đã chọn
  // 5
  public removeSelectedColor(colorId: number): void {
    // lấy vị trí muốn xóa
    let expectIndex: number;
    for (let i = 0; i < this.selectedColorList.length; i++) {
      if (this.selectedColorList[i].id === colorId) {
        expectIndex = i;
        break;
      }
    }
    this.selectedColorList.splice(expectIndex, 1);
    this.selectedImgFileList.splice(expectIndex, 1);
    this.uploadedImgFileList.splice(expectIndex, 1);
    this.removeColorSizeValidation(colorId, undefined, "color");
  }

  // 6
  public removeSelectedSize(sizeId: number): void {
    this.selectedSizeList = this.selectedSizeList.filter(
      (item: KichCo) => item.id !== sizeId
    );
    this.removeColorSizeValidation(undefined, sizeId, "size");
  }

  // functions xử lý sự kiện chọn ảnh: 7, 8, 9, 10, 11
  // 7
  public openImgModal(
    colorName: string,
    colorId: number,
    colorIndex: number
  ): void {
    this.curWorkingImgIndex = colorIndex;
    this.selectedTenMauSac = colorName;
    this.selectedIdMauSac = colorId;
    // this.getHinhAnhByMauSac(tenMau, sanPhamId);

    document.getElementById("triggerBtnImgModal").click();

    // Gán lại ds ảnh đã chọn và ds ảnh đã upload của modal màu đang chọn vào
    this.curSelectedImgFileList =
      this.selectedImgFileList[this.curWorkingImgIndex];
    this.curUploadImgFileList =
      this.uploadedImgFileList[this.curWorkingImgIndex];

    // sau khi gán các ds, ta show các ảnh đó lên
    for (let i = 0; i < this.curSelectedImgFileList.length; i++) {
      this.showImageThumbnail(
        this.curSelectedImgFileList[i],
        `selectedImgInModal${this.curWorkingImgIndex}${i}`
      );
    }

    for (let i = 0; i < this.curUploadImgFileList.length; i++) {
      this.showImageThumbnail(
        this.curUploadImgFileList[i],
        `uploadedImgInModal${this.selectedIdMauSac}${i}`
      );
    }
  }

  // 8
  public openFileInput(curWorkingImgIndex: number): void {
    document.getElementById(`fileImage${curWorkingImgIndex}`).click();
  }

  // 9
  public changeInputForUploadImg(event: any): void {
    let isHasUploadedImg = false;
    // dựa vào file input (các ảnh được chọn), ta dùng for loop gán từng file cho 'curUploadImgFileList' (đồng thời phải check xem file đó đã được chọn hay chưa)
    for (let i = 0; i < event.target["files"].length; i++) {
      let currentFile = event.target["files"][i];
      if (!this.checkUploadImage(currentFile.name, this.curUploadImgFileList)) {
        this.curUploadImgFileList.push(currentFile);
      } else {
        isHasUploadedImg = true;
      }

      if (isHasUploadedImg) {
        this.notifService.warning("Những ảnh đã được tải lên đã bị loại bỏ!");
      }
    }

    // gán list ảnh được upload vào 'list các list ảnh' được upload
    this.uploadedImgFileList[this.curWorkingImgIndex] =
      this.curUploadImgFileList;

    // show list ảnh vừa được upload
    for (let i = 0; i < this.curUploadImgFileList.length; i++) {
      this.showImageThumbnail(
        this.curUploadImgFileList[i],
        `uploadedImgInModal${this.selectedIdMauSac}${i}`
      );
    }
  }

  // 10
  public toggleUploadImage(chkBoxIndex: number, file: File, event: any): void {
    const isChecked = event.target.checked;
    if (this.curSelectedImgFileList.length === 5 && isChecked) {
      this.notifService.warning("Không chọn quá 5 ảnh!");

      const currentCheckbox = document.getElementById(
        `chkBoxUploadImg${chkBoxIndex}`
      ) as HTMLInputElement;
      currentCheckbox.checked = !currentCheckbox.checked;
      return;
    }

    if (isChecked) {
      this.curSelectedImgFileList.push(file);
      this.selectedImgFileList[this.curWorkingImgIndex] =
        this.curSelectedImgFileList;
      this.checkGiaSoLuongAnhSpct();
    } else {
      this.curSelectedImgFileList = this.curSelectedImgFileList.filter(
        (item: File) => item.name !== file.name
      );
      this.selectedImgFileList[this.curWorkingImgIndex] =
        this.curSelectedImgFileList;
      this.checkGiaSoLuongAnhSpct();
    }

    // show ảnh
    for (let i = 0; i < this.selectedImgFileList.length; i++) {
      let list = this.selectedImgFileList[i];
      for (let j = 0; j < list.length; j++) {
        if (this.curWorkingImgIndex === i) {
          this.showImageThumbnail2(list[j], `.selectedImgOutModal${i}${j}`);
        }
      }
    }

    for (let i = 0; i < this.curSelectedImgFileList.length; i++) {
      this.showImageThumbnail(
        this.curSelectedImgFileList[i],
        `selectedImgInModal${this.curWorkingImgIndex}${i}`
      );
    }
  }

  // 11
  public isUploadedImgChecked(fileName: string): boolean {
    for (let i = 0; i < this.curSelectedImgFileList.length; i++) {
      if (this.curSelectedImgFileList[i].name === fileName) {
        return true;
      }
    }
    return false;
  }
  // end: functions xử lý sự kiện chọn ảnh

  // 12
  public formatNumber(event: any, inputName: string): void {
    let value = event.target.value;
    if (value === "") {
      this.addForm.get(inputName).setValue("0");
      return;
    }
    value = value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("en-US");
    this.addForm.get(inputName).setValue(value);
  }

  // 13
  public formatNumber2(event: any, inputNameId: string): void {
    let value = event.target.value;
    if (value === "") {
      (document.getElementById(inputNameId) as HTMLInputElement).value = "0";
      return;
    }
    value = value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("en-US");
    (document.getElementById(inputNameId) as HTMLInputElement).value = value;

    this.checkGiaSoLuongAnhSpct();
  }

  // 14
  public add(): void {
    Swal.fire({
      title: "Thêm sản phẩm?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      const observables = [];

      if (result.isConfirmed) {
        this.checkPropertyValidatonForAddForm();
        // this.checkGiaSoLuong();
        this.checkGiaSoLuongAnhSpct();
        const isSpctExist = this.checkExistAndNotify();

        if (this.validation.error || isSpctExist) {
          // this.notifService.error("Thông tin sản phẩm chưa hợp lệ!");
          return;
        }

        this.turnOnOverlay("Đang thêm...");
        for (let i = 0; i < this.selectedColorList.length; i++) {
          let isContinue = false;
          let mauSacEles = document.querySelectorAll(
            `.mauSacId${this.selectedColorList[i].id}`
          );
          let kichCoEles = document.querySelectorAll(
            `.kichCoId${this.selectedColorList[i].id}`
          );
          let giaNhapInputs = document.querySelectorAll(
            `.giaNhap${this.selectedColorList[i].id}`
          );
          let giaBanInputs = document.querySelectorAll(
            `.giaBan${this.selectedColorList[i].id}`
          );
          let soLuongInputs = document.querySelectorAll(
            `.soLuong${this.selectedColorList[i].id}`
          );
          let addSPCTSubRequest: AddSPCTSubRequest;
          for (let j = 0; j < mauSacEles.length; j++) {
            let kichCoIdList: number[] = [];
            let giaNhapList: number[] = [];
            let giaBanList: number[] = [];
            let soLuongTonList: number[] = [];
            for (let k = 0; k < kichCoEles.length; k++) {
              let kichCoId = parseInt(
                (kichCoEles[k] as HTMLInputElement).value
              );
              let giaNhap = parseInt(
                (giaNhapInputs[k] as HTMLInputElement).value.replaceAll(",", "")
              );
              let giaBan = parseInt(
                (giaBanInputs[k] as HTMLInputElement).value.replaceAll(",", "")
              );
              let soLuongTon = parseInt(
                (soLuongInputs[k] as HTMLInputElement).value.replaceAll(",", "")
              );
              kichCoIdList.push(kichCoId);
              giaNhapList.push(giaNhap);
              giaBanList.push(giaBan);
              soLuongTonList.push(soLuongTon);
            }
            if (kichCoIdList.length === 0) {
              isContinue = true;
            }
            addSPCTSubRequest = {
              mauSacId: this.selectedColorList[i].id,
              kichCoIdList: kichCoIdList,
              giaNhapList: giaNhapList,
              giaBanList: giaBanList,
              soLuongTonList: soLuongTonList,
            };
          }
          if (isContinue) {
            continue;
          }
          const addSpctReq: AddSPCTRequest = {
            id: this.addForm.get("id").value,
            sanPhamId: this.addForm.get("sanPhamId").value,
            kieuDangId: this.addForm.get("kieuDangId").value,
            thietKeId: this.addForm.get("thietKeId").value,
            tayAoId: this.addForm.get("tayAoId").value,
            coAoId: this.addForm.get("coAoId").value,
            chatLieuId: this.addForm.get("chatLieuId").value,
            requests: addSPCTSubRequest,
          };

          observables.push(
            this.spctService.add(addSpctReq, this.selectedImgFileList[i])
          );
        }

        forkJoin(observables).subscribe({
          next: (responses: string[]) => {
            responses.forEach((response, index) => {
              this.notifService.success(response);
              // chỉ sau khi thêm xong màu sắc cuối cùng mới chuyển trang và đóng overlay
              if (index === this.selectedColorList.length - 1) {
                this.turnOffOverlay("");
                this.router.navigate([`/sp/ds-sp-chi-tiet/${this.sanPham.id}`]);
              }
            });
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.notifService.error(errorResponse.error.message);
            this.turnOffOverlay("");
          },
        });
      }
    });
  }

  //
  public deleteRow(rowId: string, colorId: number, sizeId: number): void {
    const selectedRow = document.getElementById(rowId);

    if (selectedRow) {
      selectedRow.remove();
      this.removeColorSizeValidation(colorId, sizeId, "other");
    }
  }

  //
  public selectAllRows1Color(selectedColorId: number): void {
    const ckBoxAll = document.getElementById(
      `ckBoxAll${selectedColorId}`
    ) as HTMLInputElement;
    const selectedCkBoxs = document.querySelectorAll(
      `.ckBoxColor${selectedColorId}`
    );

    for (let i = 0; i < selectedCkBoxs.length; i++) {
      const ckBox = selectedCkBoxs[i] as HTMLInputElement;
      if (i === 0) {
        continue;
      }
      ckBox.checked = ckBoxAll.checked;
    }
  }

  //
  public toggleUpdateFieldBtn(selectedColorId: number): boolean {
    const selectedCkBoxs = document.querySelectorAll(
      `.ckBoxColor${selectedColorId}`
    );

    for (let i = 0; i < selectedCkBoxs.length; i++) {
      const ckBox = selectedCkBoxs[i] as HTMLInputElement;
      if (ckBox.checked) {
        return true;
      }
    }
    return false;
  }

  //
  public saveSoLuongForm(): void {
    let soLuongValue = (
      document.getElementById("soLuongInput") as HTMLInputElement
    ).value;
    let giaNhapValue = (
      document.getElementById("giaNhapInput") as HTMLInputElement
    ).value;
    let giaBanValue = (
      document.getElementById("giaBanInput") as HTMLInputElement
    ).value;

    let soLuongInputs = document.querySelectorAll(
      `.soLuong${this.chinhSuaBtnId}`
    );
    let giaNhapInputs = document.querySelectorAll(
      `.giaNhap${this.chinhSuaBtnId}`
    );
    let giaBanInputs = document.querySelectorAll(
      `.giaBan${this.chinhSuaBtnId}`
    );

    for (let i = 0; i < soLuongInputs.length; i++) {
      let soLuongInput = soLuongInputs[i] as HTMLInputElement;
      let giaNhapInput = giaNhapInputs[i] as HTMLInputElement;
      let giaBanInput = giaBanInputs[i] as HTMLInputElement;

      let chkBoxInput = document.getElementById(
        soLuongInput.id.replace("soLuong", "ckBoxColor")
      ) as HTMLInputElement;
      if (chkBoxInput.checked) {
        soLuongInput.value = soLuongValue;
        giaNhapInput.value = giaNhapValue;
        giaBanInput.value = giaBanValue;
      }
    }

    const chinhSuaNhanhBtn = document.getElementById("chinhSuaNhanhBtn");
    chinhSuaNhanhBtn.click();
    this.checkGiaSoLuongAnhSpct();
  }

  //
  public assignChinhSuaBtnId(id: number): void {
    this.chinhSuaBtnId = id;
  }

  //
  public initAddForm(): void {
    this.addForm = new FormGroup({
      id: new FormControl(0),
      sanPhamId: new FormControl(0),
      kieuDangId: new FormControl(0),
      thietKeId: new FormControl(0),
      tayAoId: new FormControl(0),
      coAoId: new FormControl(0),
      chatLieuId: new FormControl(0),
    });
  }

  //
  public initQuickAddForm(): void {
    this.quickAddForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
    });
  }

  public checkSpctExist(
    spId: number,
    mauSacId: number,
    sizeId: number
  ): boolean {
    this.spctService.checkSpctExists(spId, mauSacId, sizeId).subscribe({
      next: (response: boolean) => {
        return response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
    return false;
  }

  public checkHasRow(colorId: number): boolean {
    const rows = document.querySelectorAll(`.ckBoxColor${colorId}`);
    return rows.length > 0 ? true : false;
  }

  // functions cho sự kiện chọn, thêm nhanh thuộc tính
  // lấy ID của thuộc tính đã chọn và gán vào addForm
  public selectThuocTinh(event: any, fields: any[], formControl: string): void {
    const fieldValue = event.target.value;
    const field = fields.find((f: any) => f.ten === fieldValue);

    if (field) {
      this.addForm.get(`${formControl}`).setValue(field.id);
      this.validation[formControl] = false;
    }
  }

  // mỗi khi ấn một nút thêm nhanh, lấy tên thuộc tính và tên service từ đó
  public changeNameAndServiceForThuocTinh(
    ten: string,
    serviceName: string
  ): void {
    this.commonService = serviceName;
    for (let i = 0; i < this.services.length; ++i) {
      if (this.services[i].ten === serviceName) {
        this.commonService = this.services[i].service;
      }
    }
    this.thuocTinhNhanh.ten = ten;
  }

  //
  public addNhanhThuocTinh(): void {
    let trimmed = this.quickAddForm.get("ten").value.trim();
    this.quickAddForm.get("ten")?.setValue(trimmed);

    this.commonService.add(this.quickAddForm.value).subscribe({
      next: (response: any) => {
        this.initQuickAddForm();
        this.notifService.success(`Thêm thành công '${response.ten}'!`);
        document.getElementById("closeAddNhanhBtn").click();
        this.getPropertiesForSelectors();
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  public checkColorAndSize(colorId: number, sizeId: number): boolean {
    return this.colorSizeValidations.find(
      (v: ColorSizeValidation) => v.colorId === colorId && v.sizeId === sizeId
    )?.isExist;
  }

  // private functions
  // 1
  private checkUploadImage(fileName: string, curUploadImgFileList: File[]) {
    return curUploadImgFileList.some((file: File) => file.name === fileName);
  }

  // 2
  private getHinhAnhByMauSac(tenMau: string, sanPhamID: number): void {
    this.hinhAnhSanPhamService.getAll(tenMau, sanPhamID).subscribe({
      next: (response: HinhAnh[]) => {
        // this.existingImgList = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // 3
  private showImageThumbnail(file: File, thumnailId: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById(thumnailId) as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }

  // 4
  private showImageThumbnail2(file: File, thumnailClass: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.querySelector(`${thumnailClass}`) as HTMLImageElement)["src"] =
        e.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  // 5
  private getProductByIdAndItsSpct(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.sanPhamService.getById(params["sanPhamId"]).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;
          this.addForm.get("sanPhamId").setValue(response.id);

          // hàm này kiểm tra xem SP hiện tại có SPCT nào chưa
          this.spctService.getAnySpctBySanPhamId(response.id).subscribe({
            next: (spctResponse: SanPhamChiTiet) => {
              if (response != null) {
                this.existSpct = spctResponse;

                this.addForm = new FormGroup({
                  id: new FormControl(spctResponse.id),
                  sanPhamId: new FormControl(response.id),
                  chatLieuId: new FormControl(spctResponse.chatLieu.id),
                  coAoId: new FormControl(spctResponse.coAo.id),
                  kieuDangId: new FormControl(spctResponse.kieuDang.id),
                  tayAoId: new FormControl(spctResponse.tayAo.id),
                  thietKeId: new FormControl(spctResponse.thietKe.id),
                });
              }
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.notifService.error(errorResponse.error.message);
            },
          });
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
    });
  }

  // 6
  private getPropertiesForSelectors(): void {
    // lấy 7 các thuộc tính của SP: kiểu dáng, thiết kế, tay áo, cổ áo, chất liệu, màu sắc, kích cỡ
    this.getAllForms();
    this.getAllDesigns();
    this.getAllSleeves();
    this.getAllActiveCollars();
    this.getAllActiveMaterials();
    this.getAllActiveColors();
    this.getAllActiveSizes();
  }

  // 7, 8, 9, 10, 11, 12, 13: lấy các thuộc tính active của sản phẩm
  // 7
  private getAllActiveColors(): void {
    this.mauSacService.getAllActiveColors().subscribe({
      next: (response: MauSac[]) => {
        this.activeColors = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 8
  private getAllActiveSizes(): void {
    this.kichCoService.getAll().subscribe({
      next: (response: KichCo[]) => {
        this.activeSizes = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 9
  private getAllForms(): void {
    this.kieuDangService.getAllActive().subscribe({
      next: (response: KieuDang[]) => {
        this.activeForms = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 10
  private getAllDesigns(): void {
    this.kieuThietKeService.getAllActive().subscribe({
      next: (response: KieuThietKe[]) => {
        this.activeDesigns = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 11
  private getAllSleeves(): void {
    this.kieuTayAoService.getAllActive().subscribe({
      next: (response: TayAo[]) => {
        this.activeSleeves = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 12
  private getAllActiveCollars(): void {
    this.kieuCoAoService.getAllActive().subscribe({
      next: (response: CoAo[]) => {
        this.activeCollars = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 13
  private getAllActiveMaterials(): void {
    this.chatLieuService.getAllActive().subscribe({
      next: (response: ChatLieu[]) => {
        this.activeMaterials = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }
  // end

  // 14
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 15
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  // 16
  private checkPropertyValidatonForAddForm(): void {
    if (this.addForm.get("kieuDangId").value == 0) {
      this.validation.error = true;
      this.validation.kieuDangId = true;
    }

    if (this.addForm.get("thietKeId").value == 0) {
      this.validation.error = true;
      this.validation.thietKeId = true;
    }

    if (this.addForm.get("tayAoId").value == 0) {
      this.validation.error = true;
      this.validation.tayAoId = true;
    }

    if (this.addForm.get("coAoId").value == 0) {
      this.validation.error = true;
      this.validation.coAoId = true;
    }

    if (this.addForm.get("chatLieuId").value == 0) {
      this.validation.error = true;
      this.validation.chatLieuId = true;
    }
  }

  //

  // 18
  private checkGiaSoLuongAnhSpct(): void {
    let hasError = false;

    for (let i = 0; i < this.selectedImgFileList.length; i++) {
      if (this.selectedImgFileList[i].length === 0) {
        hasError = true;
        this.validation.anh[i] = true;
      } else {
        this.validation.anh[i] = false;
      }
    }

    for (let i = 0; i < this.selectedColorList.length; i++) {
      const color = this.selectedColorList[i];

      let giaNhaps = document.querySelectorAll(`.giaNhap${color.id}`);
      let giaBans = document.querySelectorAll(`.giaBan${color.id}`);
      let soLuongs = document.querySelectorAll(`.soLuong${color.id}`);

      for (let j = 0; j < giaNhaps.length; ++j) {
        let giaNhap = parseInt(
          (giaNhaps[j] as HTMLInputElement).value.replaceAll(",", "")
        );

        let giaBan = parseInt(
          (giaBans[j] as HTMLInputElement).value.replaceAll(",", "")
        );

        let soLuong = parseInt(
          (soLuongs[j] as HTMLInputElement).value.replaceAll(",", "")
        );

        if (giaNhap >= giaBan || giaNhap <= 0 || giaBan <= 0 || soLuong <= 0) {
          hasError = true;
          this.validation.giaAndSoLuong[i] = true;
        } else {
          this.validation.giaAndSoLuong[i] = false;
        }
      }
    }

    if (
      hasError ||
      this.selectedColorList.length === 0 ||
      this.selectedColorList.length === 0
    ) {
      this.validation.error = true;
    } else {
      this.validation.error = false;
    }
  }

  // 19
  private addColorSizeValidation(
    colorId: number | undefined,
    sizeId: number | undefined,
    type: string
  ): void {
    if (colorId && type === "color") {
      for (let i = 0; i < this.selectedSizeList.length; ++i) {
        const size = this.selectedSizeList[i];
        this.spctService
          .checkSpctExists(this.sanPham.id, colorId, size.id)
          .subscribe({
            next: (response: boolean) => {
              const colorSizeValidation: ColorSizeValidation = {
                colorId: colorId,
                sizeId: size.id,
                isExist: response,
              };
              this.colorSizeValidations.push(colorSizeValidation);
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.notifService.error(errorResponse.error.message);
            },
          });
      }
    } else if (sizeId && type === "size") {
      for (let i = 0; i < this.selectedColorList.length; ++i) {
        const color = this.selectedColorList[i];
        this.spctService
          .checkSpctExists(this.sanPham.id, color.id, sizeId)
          .subscribe({
            next: (response: boolean) => {
              const colorSizeValidation: ColorSizeValidation = {
                colorId: color.id,
                sizeId: sizeId,
                isExist: response,
              };
              this.colorSizeValidations.push(colorSizeValidation);
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.notifService.error(errorResponse.error.message);
            },
          });
      }
    }
  }

  //
  private removeColorSizeValidation(
    colorId: number | undefined,
    sizeId: number | undefined,
    type: string
  ): void {
    if (colorId && type === "color") {
      this.colorSizeValidations = this.colorSizeValidations.filter(
        (item: ColorSizeValidation) => item.colorId !== colorId
      );
    } else if (sizeId && type === "size") {
      this.colorSizeValidations = this.colorSizeValidations.filter(
        (item: ColorSizeValidation) => item.sizeId !== sizeId
      );
    } else {
      this.colorSizeValidations = this.colorSizeValidations.filter(
        (item: ColorSizeValidation) =>
          !(item.colorId === colorId && item.sizeId === sizeId)
      );
    }
  }

  //
  public checkExistAndNotify(): boolean {
    if (this.colorSizeValidations.some((v: ColorSizeValidation) => v.isExist)) {
      const duplicatedArr: ColorSizeValidation[] =
        this.colorSizeValidations.filter((v: ColorSizeValidation) => v.isExist);
      let message: string = "";
      for (let i = 0; i < duplicatedArr.length; i++) {
        const color = this.selectedColorList.find(
          (v) => v.id === duplicatedArr[i].colorId
        );
        const size = this.selectedColorList.find(
          (v) => v.id === duplicatedArr[i].sizeId
        );
        message += `${color.ten} - ${size.ten.split("-")[0]}`;
        if (i !== duplicatedArr.length - 1) {
          message += ", ";
        }
      }
      if (message) {
        message += " đã tồn tại!";
        this.notifService.error(message);
      }
      return true;
    }
    return false;
  }
}

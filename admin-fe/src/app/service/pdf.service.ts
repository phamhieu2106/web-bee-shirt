import { Injectable } from "@angular/core";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Margins, TDocumentDefinitions } from "pdfmake/interfaces";
import { HoaDon } from "../model/class/hoa-don.class";
import { HoaDonChiTiet } from "../model/class/hoa-don-chi-tiet.class";
import { HoaDonService } from "./hoa-don.service";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class PdfService {
  constructor(private hoaDonService: HoaDonService) {}
  storeInfo = {
    name: "Bee-Shirt",
    sdt: "0123456789",
    email: "beeshirt@gmail.com",
    address:
      "Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội",
  };
  generatePDFPhieuGiao(hoaDon: HoaDon) {
    let products = hoaDon.hoaDonChiTiets.map((hdct) => {
      let product = [
        `${hdct.sanPhamChiTiet.sanPham.ten} \n Size: ${hdct.sanPhamChiTiet.kichCo.ten} - Màu: ${hdct.sanPhamChiTiet.mauSac.ten}`,
        hdct.soLuong + "",
      ];
      return product;
    });

    let dd: TDocumentDefinitions = {
      content: [
        { text: "Phiếu Giao Hàng", style: "header" },
        {
          columns: [
            {
              width: "50%",
              text: [
                { text: "Bên Gửi:\n", style: "subheader" },
                {
                  text: `Tên: ${this.storeInfo.name}\nĐịa chỉ: ${this.storeInfo.address}\nSố điện thoại: ${this.storeInfo.sdt}`,
                  style: "text",
                },
              ],
            },
            {
              width: "50%",
              text: [
                { text: "Bên Nhận:\n", style: "subheader" },
                {
                  text: `Tên: ${hoaDon.tenNguoiNhan}\nĐịa chỉ: ${hoaDon.diaChiNguoiNhan},\nSố điện thoại: ${hoaDon.sdtNguoiNhan}`,
                  style: "text",
                },
              ],
            },
          ],
        },
        { text: "Nội dung đơn hàng:", style: "subheader" },
        {
          table: {
            headerRows: 1,
            widths: ["80%", "20%"], // Thiết lập chiều rộng của các cột
            body: [["Tên sản phẩm", "Số lượng"], ...products],
          },
        },
        {
          text:
            `Tiền Thu Hộ:  ` +
            this.convertToVND(
              hoaDon.tongTien +
                hoaDon.phiVanChuyen -
                hoaDon.tienGiam -
                this.hoaDonService.getTienKhachThanhToan(hoaDon.thanhToans)
            ),
          style: "boldText",
          margin: [0, 20, 0, 0],
        }, // Sử dụng kiểu văn bản mới đã định nghĩa
        {
          columns: [
            { qr: `${hoaDon.ma}`, alignment: "center" }, // QR code
            {
              text: "Chữ ký người nhận\n(Xác nhận hàng nguyên vẹn, không móp/méo)",
              alignment: "center",
            }, // Chữ ký
          ],
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        text: {
          margin: [0, 5, 0, 15],
        },
        boldText: {
          // Định nghĩa kiểu văn bản mới cho chữ in đậm và cỡ chữ lớn
          bold: true,
          fontSize: 14,
        },
      },
    };
    pdfMake.createPdf(dd).print();
  }
  generatePDFHoaDon(hoaDon: HoaDon) {
    let hdcts = hoaDon.hoaDonChiTiets.map((hdct, index) => {
      let hdctNew = [
        index + 1 + "",
        `${hdct.sanPhamChiTiet.sanPham.ten} \n ${hdct.sanPhamChiTiet.kichCo.ten} - ${hdct.sanPhamChiTiet.mauSac.ten}`,
        hdct.soLuong.toString(),
        this.convertToVND(hdct.giaBan),
        this.convertToVND(hdct.giaBan * hdct.soLuong),
      ];
      return hdctNew;
    });
    const dd: TDocumentDefinitions = {
      content: [
        {
          text: `${this.storeInfo.name}\n`,
          alignment: "center",
          fontSize: 35,
        },
        { text: `\n` },
        { text: `Số điện thoại: ${this.storeInfo.sdt}`, alignment: "center" },
        { text: `Email: ${this.storeInfo.email}`, alignment: "center" },
        { text: `Địa chỉ: ${this.storeInfo.address}`, alignment: "center" },
        { text: `\n`, alignment: "center" },
        { text: `HOÁ ĐƠN BÁN HÀNG`, alignment: "center", fontSize: 28 },
        {
          columns: [
            {
              width: "50%",
              text: `Tên khách hàng:${
                hoaDon.khachHang != null ? hoaDon.khachHang.hoTen : ""
              } `,
            },
            {
              width: "50%",
              text: `Mã hóa đơn: ${hoaDon.ma}`,
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          columns: [
            {
              width: "50%",
              text: `Địa chỉ nhận hàng:${
                hoaDon?.diaChiNguoiNhan ? hoaDon.diaChiNguoiNhan : ""
              } `,
            },
            {
              width: "50%",
              text: `Ngày tạo: ${
                hoaDon.createdAt == null ? "" : hoaDon.createdAt
              }`,
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          columns: [
            {
              width: "50%",
              text: `Số điện thoại: ${
                hoaDon?.khachHang?.sdt
                  ? hoaDon.khachHang.sdt
                  : hoaDon?.sdtNguoiNhan
                  ? hoaDon.sdtNguoiNhan
                  : ""
              } `,
            },
            {
              width: "50%",
              text: `Email: ${
                hoaDon?.khachHang?.email
                  ? hoaDon.khachHang.email
                  : hoaDon?.emailNguoiNhan
                  ? hoaDon.emailNguoiNhan
                  : ""
              }`,
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        { text: `Ghi chú: ${hoaDon.ghiChu == null ? "" : hoaDon.ghiChu}` },
        { text: `\n` },
        { text: `DANH SÁCH HÓA ĐƠN`, alignment: "center", fontSize: 22 },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["5%", "50%", "5%", "20%", "20%"],

            // body: this.genTableContent(hoaDon.hoaDonChiTiets),
            body: [
              [
                "STT",
                "Tên sản phẩm                                    ",
                "SL",
                "Đơn giá",
                "Thành tiền",
              ],
              ...hdcts,
            ],
          },
        },
        { text: "\n" },
        {
          columns: [
            {
              width: "50%",
              text: ``,
            },
            [
              {
                columns: [
                  {
                    width: "50%",
                    text: `Tổng tiền hàng:`,
                  },
                  {
                    width: "50%",
                    text: `${this.convertToVND(hoaDon.tongTien)}`,
                  },
                ],
                // optional space between columns
                columnGap: 10,
              },
              {
                columns: [
                  {
                    width: "50%",
                    text: `Giảm giá:`,
                  },
                  {
                    width: "50%",
                    text: `${this.convertToVND(hoaDon.tienGiam)}`,
                  },
                ],
                // optional space between columns
                columnGap: 10,
              },
              {
                columns: [
                  {
                    width: "50%",
                    text: `Phí giao:`,
                  },
                  {
                    width: "50%",
                    text: `${this.convertToVND(hoaDon.phiVanChuyen)}`,
                  },
                ],
                // optional space between columns
                columnGap: 10,
              },
              {
                columns: [
                  {
                    width: "50%",
                    text: `Khách phải trả:`,
                  },
                  {
                    width: "50%",
                    text: `${this.convertToVND(
                      hoaDon.tongTien - hoaDon.tienGiam + hoaDon.phiVanChuyen
                    )}`,
                  },
                ],
                // optional space between columns
                columnGap: 10,
              },
            ],
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          columns: [
            { qr: `${hoaDon.ma}`, alignment: "center" }, // QR code
            {
              text: "Chữ ký người nhận\n(Xác nhận hàng nguyên vẹn, không móp/méo)",
              alignment: "center",
            }, // Chữ ký
          ],
          margin: [0, 20, 0, 0],
        },
        {
          columns: [
            {
              text: "*Hóa đơn trong vòng 7 ngày từ thời điểm mua hàng/nhận hàng có thể được trả hàng nếu khách hàng muốn trả sản phẩm nếu có bất kì dấu hiệu sản phẩm bị lỗi",
              alignment: "left",
              marginTop: 40,
            },
          ],
        },
        {
          columns: [
            {
              text: "*Các sản phẩm được giảm giá sẽ không được trả hàng theo quy định của cửa hàng",
              alignment: "left",
            },
          ],
        },
      ],
    };
    pdfMake.createPdf(dd).print();
  }

  convertToVND(number: number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "VND",
    });
  }

  genTableContent(hdcts: HoaDonChiTiet[]) {
    var body = [];
    var titles = [
      "STT",
      "Tên sản phẩm                                    ",
      "SL",
      "Đơn giá",
      "Thành tiền",
    ];
    body.push(titles);
    hdcts.forEach((hdct, index) => {
      body.push([
        ...(index + 1).toString(),
        `${hdct.sanPhamChiTiet.sanPham.ten} \n ${hdct.sanPhamChiTiet.kichCo.ten} - ${hdct.sanPhamChiTiet.mauSac.ten}`,
        hdct.soLuong.toString(),
        this.convertToVND(hdct.giaBan),
        this.convertToVND(hdct.giaBan * hdct.soLuong),
      ]);
    });
    // console.log(body);
    return body;
  }
}

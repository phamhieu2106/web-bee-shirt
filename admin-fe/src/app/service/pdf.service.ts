import { Injectable } from "@angular/core";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Margins, TDocumentDefinitions } from "pdfmake/interfaces";
import { HoaDon } from "../model/class/hoa-don.class";
import { HoaDonChiTiet } from "../model/class/hoa-don-chi-tiet.class";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class PdfService {
  constructor() {}
  storeInfo = {
    name: "Bee-Shirt",
    sdt: "0123456789",
    email: "beeshirt@gmail.com",
    address:
      "Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội",
  };

  generatePDFHoaDon(hoaDon: HoaDon) {
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
              text: `Tên khách hàng:${hoaDon.tenNguoiNhan} `,
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
              text: `Địa chỉ nhận hàng:${hoaDon.diaChiNguoiNhan} `,
            },
            {
              width: "50%",
              text: `Ngày tạo: ${hoaDon.createdAt}`,
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          columns: [
            {
              width: "50%",
              text: `Số điện thoại: ${hoaDon.sdtNguoiNhan} `,
            },
            {
              width: "50%",
              text: `Email: ${hoaDon.emailNguoiNhan}`,
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        { text: `Ghi chú: ${hoaDon.ghiChu}` },
        { text: `\n` },
        { text: `DANH SÁCH HÓA ĐƠN`, alignment: "center", fontSize: 22 },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["10%", "30%", "10%", "20%", "30%"],

            body: this.genTableContent(hoaDon.hoaDonChiTiets),
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
    var titles = ["STT", "Tên sản phẩm", "SL", "Đơn giá", "Thành tiền"];
    body.push(titles);
    hdcts.forEach((hdct, index) => {
      body.push([
        ...(index + 1).toString(),
        "Tên sản phẩm",
        hdct.soLuong.toString(),
        this.convertToVND(hdct.giaBan),
        this.convertToVND(hdct.giaBan * hdct.soLuong),
      ]);
    });
    // console.log(body);
    return body;
  }
}

// var docDefinition = {
//   content: [
//     this.storeInfo.name,
//     `Số điện thoại: ${this.storeInfo.name}`,
//     `Email: ${this.storeInfo.email}`,
//     `Địa chỉ: ${this.storeInfo.address}`,
//     `\n`,
//     `HÓA ĐƠN BÁN HÀNG`,
//     {
//       columns: [
//         {
//           width: "50%",
//           text: `Tên khách hàng: ${hoaDon.tenNguoiNhan}`,
//         },
//         {
//           width: "50%",
//           text: `Mã hóa đơn: ${hoaDon.ma}`,
//         },
//       ],
//       // optional space between columns
//       columnGap: 10,
//     },
//     {
//       columns: [
//         {
//           width: "50%",
//           text: `Địa chỉ nhận hàng: ${hoaDon.diaChiNguoiNhan}`,
//         },
//         {
//           width: "50%",
//           text: `Ngày tạo: ${hoaDon.createdAt}`,
//         },
//       ],
//       // optional space between columns
//       columnGap: 10,
//     },
//     {
//       columns: [
//         {
//           width: "50%",
//           text: `Số điện thoại: ${hoaDon.sdtNguoiNhan} `,
//         },
//         {
//           width: "50%",
//           text: `Email: ${hoaDon.emailNguoiNhan}`,
//         },
//       ],
//       // optional space between columns
//       columnGap: 10,
//     },
//     {
//       columns: [
//         {
//           width: "50%",
//           text: `Người tạo: ${hoaDon.createdBy} `,
//         },
//       ],
//       // optional space between columns
//       columnGap: 10,
//     },
//     {
//       columns: [
//         {
//           width: "100%",
//           text: `Ghi chú: ${hoaDon.ghiChu} `,
//         },
//       ],
//       // optional space between columns
//       columnGap: 10,
//     },
//     "DANH SÁCH SẢN PHẨM",
//     "\n",
//     {
//       columns: [
//         {
//           width: "10%",
//           text: `STT`,
//         },
//         {
//           width: "30%",
//           text: `Tên sản phẩm`,
//         },
//         {
//           width: "20%",
//           text: `Đơn giá`,
//         },
//         {
//           width: "10%",
//           text: `SL`,
//         },
//         {
//           width: "30%",
//           text: `Thành tiền`,
//         },
//       ],
//     },
//     this.genTableContent(hoaDon.hoaDonChiTiets),
//   ],
// };

// genTableContent(hoaDonChiTiets: HoaDonChiTiet[]) {
//   let a: TDocumentDefinitions;
//   let result: { columns: { width: string; text: string }[] }[] = [];
//   hoaDonChiTiets.forEach((hoaDonChiTiet, index) => {
//     result.push({
//       columns: [
//         {
//           width: "10%",
//           text: `${index + 1}`,
//         },
//         {
//           width: "30%",
//           text: `Tên sản phẩm`,
//         },
//         {
//           width: "20%",
//           text: `${this.convertToVND(hoaDonChiTiet.giaBan)}`,
//         },
//         {
//           width: "10%",
//           text: `${hoaDonChiTiet.soLuong}`,
//         },
//         {
//           width: "30%",
//           text: `${this.convertToVND(
//             hoaDonChiTiet.soLuong * hoaDonChiTiet.giaBan
//           )} `,
//         },
//       ],
//     });
//   });

//   return result;
// }

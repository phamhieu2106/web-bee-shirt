import { Injectable } from "@angular/core";
import { HoaDon } from "../model/class/hoa-don.class";

@Injectable({
  providedIn: "root",
})
export class LocalStorageServiceService {
  constructor() {}
  // Lưu dữ liệu vào localStorage
  saveData(key: string, value: any): void {
    let data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }
  // Lấy dữ liệu từ localStorage
  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
  // Xóa dữ liệu từ localStorage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}

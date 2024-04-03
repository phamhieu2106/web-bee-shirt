import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KhachHangComponent } from "./khach-hang/khach-hang.component";

const taiKhoanRoute: Routes = [
  { path: "tai-khoan/my-account", component: KhachHangComponent },
];

@NgModule({
  imports: [RouterModule.forChild(taiKhoanRoute)],
  exports: [RouterModule],
})
export class appKhachHangRoutingModule {}

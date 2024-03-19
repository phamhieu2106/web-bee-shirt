import { NgModule } from "@angular/core";

import { DotGiamGiaRoutingModule } from "./dot-giam-gia-routing.module";
import { DotGiamGiaComponent } from "./dot-giam-gia/dot-giam-gia.component";
import { FilterComponent } from "./filter/filter.component";
import { TableComponent } from "./table/table.component";
import { LayoutModule } from "../layout-module/layout.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "./modal/modal.component";
import { FormComponent } from "./form/form.component";
import { ThemDotGiamGiaComponent } from "./them-dot-giam-gia/them-dot-giam-gia.component";
import { ChiTietDotGiamGiaComponent } from "./chi-tiet-dot-giam-gia/chi-tiet-dot-giam-gia.component";
import { CapNhatDotGiamGiaComponent } from "./cap-nhat-dot-giam-gia/cap-nhat-dot-giam-gia.component";
import { NzTableModule } from "ng-zorro-antd/table";

@NgModule({
  declarations: [
    DotGiamGiaComponent,
    FilterComponent,
    TableComponent,
    ThemDotGiamGiaComponent,
    ModalComponent,
    FormComponent,
    ChiTietDotGiamGiaComponent,
    CapNhatDotGiamGiaComponent,
  ],
  imports: [
    DotGiamGiaRoutingModule,
    LayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
  ],
})
export class DotGiamGiaModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThongKeModuleRoutingModule } from "./thong-ke-module-routing.module";
import { ThongKeComponent } from "./thong-ke/thong-ke.component";

@NgModule({
  declarations: [ThongKeComponent],
  imports: [CommonModule, ThongKeModuleRoutingModule],
})
export class ThongKeModuleModule {}

import { NgModule } from '@angular/core';

import { DotGiamGiaRoutingModule } from './dot-giam-gia-routing.module';
import { DotGiamGiaComponent } from './dot-giam-gia/dot-giam-gia.component';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { FormAddComponent } from './form-add/form-add.component';
import { FormUpdateComponent } from './form-update/form-update.component';

@NgModule({
  declarations: [
    DotGiamGiaComponent,
    FilterComponent,
    TableComponent,
    FormAddComponent,
    FormUpdateComponent
  ],
  imports: [DotGiamGiaRoutingModule],
})
export class DotGiamGiaModule {}

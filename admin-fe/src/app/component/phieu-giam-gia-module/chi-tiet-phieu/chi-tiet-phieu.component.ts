import { Component, Input, SimpleChanges } from '@angular/core';
import { PhieuGiamGia } from 'src/app/model/class/phieu-giam-gia.class';

@Component({
  selector: 'app-chi-tiet-phieu',
  templateUrl: './chi-tiet-phieu.component.html',
  styleUrls: ['./chi-tiet-phieu.component.css']
})
export class ChiTietPhieuComponent {
  @Input() phieuDetails: PhieuGiamGia

  public phieu: PhieuGiamGia

}

import { Component, Input, OnInit } from '@angular/core';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';

@Component({
  selector: 'app-khach-hang-detail',
  templateUrl: './khach-hang-detail.component.html',
  styleUrls: ['./khach-hang-detail.component.css']
})
export class KhachHangDetailComponent implements OnInit{
  @Input() khChiTiet: KhachHangResponse;

  ngOnInit(): void {
  }
}

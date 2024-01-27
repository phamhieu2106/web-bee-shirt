import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhachHang } from 'src/app/model/class/KhachHang.class';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';
import { KhachHangService } from 'src/app/service/khach-hang.service';

@Component({
  selector: 'app-sua-khach-hang',
  templateUrl: './sua-khach-hang.component.html',
  styleUrls: ['./sua-khach-hang.component.css']
})
export class SuaKhachHangComponent implements OnInit {
  public kh: KhachHangResponse;
  public id: number;
  constructor(
    private route: ActivatedRoute,
    private khachHangService: KhachHangService
  ){}
  ngOnInit() {
// this.route.params.subscribe(params=>{
//   this.id = +params['id'];
//   this.khachHangService.getById(this.id).subscribe(
//     (kh) => (this.kh = kh),
//     (error) => console.error(error)
//   );
// })
  }
}

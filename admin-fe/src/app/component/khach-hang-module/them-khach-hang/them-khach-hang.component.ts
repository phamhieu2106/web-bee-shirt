import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-them-khach-hang',
  templateUrl: './them-khach-hang.component.html',
  styleUrls: ['./them-khach-hang.component.css']
})
export class ThemKhachHangComponent implements OnInit {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  mainHeading: string = "khách hàng";

  constructor() { }

  ngOnInit() {
  }

}

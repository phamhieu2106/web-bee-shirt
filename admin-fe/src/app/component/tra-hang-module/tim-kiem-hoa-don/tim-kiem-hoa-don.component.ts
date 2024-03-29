import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { TraHangService } from "src/app/service/tra-hang.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-tim-kiem-hoa-don",
  templateUrl: "./tim-kiem-hoa-don.component.html",
  styleUrls: ["./tim-kiem-hoa-don.component.css"],
})
export class TimKiemHoaDonComponent implements OnInit {
  public maHoaDon: string;
  hoaDon: HoaDon = null;

  // Event
  @Output() findHoaDon: EventEmitter<any> = new EventEmitter();

  constructor(private traHangService: TraHangService) {}
  ngOnInit(): void {}
  public reset() {
    this.maHoaDon = null;
    this.findHoaDon.emit(null);
  }
  public submitForm(): void {
    if (this.maHoaDon == null) {
      this.findHoaDon.emit(null);
    } else {
      this.traHangService.getHoaDon(this.maHoaDon).subscribe({
        next: (value) => {
          this.hoaDon = value;
        },
        error: (err) => {
          Swal.fire({
            toast: true,
            icon: "error",
            position: "top-end",
            title: `Lỗi: ${err.error.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
        },
        complete: () => {
          console.log(this.hoaDon);
          this.findHoaDon.emit(this.hoaDon);
        },
      });
    }
  }
}

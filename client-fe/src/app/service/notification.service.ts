import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  // 1
  public success(title: string): void {
    Swal.fire({
      toast: true,
      icon: "success",
      position: "top-end",
      title: `${title}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }

  // 2
  public error(title: string): void {
    Swal.fire({
      toast: true,
      icon: "error",
      position: "top-end",
      title: `${title}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }

  //
  public warning(title: string): void {
    Swal.fire({
      toast: true,
      icon: "warning",
      position: "top-end",
      title: `${title}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }
}

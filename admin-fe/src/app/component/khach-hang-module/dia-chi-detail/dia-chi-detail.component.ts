import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaChi } from 'src/app/model/class/dia-chi.class';
import { DiaChiService } from 'src/app/service/dia-chi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dia-chi-detail',
  templateUrl: './dia-chi-detail.component.html',
  styleUrls: ['./dia-chi-detail.component.css']
})
export class DiaChiDetailComponent implements OnInit {
  public updateFormDC: FormGroup;
  @Input() dcDetail: any; 
  constructor(    private diaChiService: DiaChiService) { }

  ngOnInit() {
    
  }
  public initFormUpdateDC(): void {
    this.updateFormDC = new FormGroup({
      id: new FormControl("", [Validators.required]),
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
    });
  }

  public updateDC(id: number): void {
    this.diaChiService.updateDC(id,this.updateFormDC.value).subscribe({
      next: (dc: DiaChi) => {
        this.initFormUpdateDC();
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công!`,
          showConfirmButton: false,
          timer: 1000,
        });
        document.getElementById("closeUpdateBtn").click();
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
}

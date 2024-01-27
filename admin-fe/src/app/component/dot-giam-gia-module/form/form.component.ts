import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Input() modalAction: string;
  @Input() formHeader: string;
  @Input() formButton: string;
  @Input() typeForm: string;
  // list product
  @Input() listProduct: Array<number>;
  public form: any;

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.form = new FormGroup({
      tenDotGiamGia: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\u00C0-\u024F]+$/),
      ]),
      giaTriPhanTram: new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]+$`),
      ]),
      ngayBatDau: new FormControl(null, [Validators.required]),
      ngayKetThuc: new FormControl(null, [Validators.required]),
    });
  }

  public resetForm() {
    this.form.reset();
  }

  public handleSubmit = () => {
    if (this.typeForm === "add") {
      console.log(this.form.value);
      console.log(this.listProduct);
    } else if (this.typeForm === "update") {
      console.log("handle update");
    }
  };

  // Get FormControl
  public get TenDotGiamGia() {
    return this.form.get("tenDotGiamGia");
  }
  public get GiaTriPhanTram() {
    return this.form.get("giaTriPhanTram");
  }
  public get NgayBatDau() {
    return this.form.get("ngayBatDau");
  }
  public get NgayKetThuc() {
    return this.form.get("ngayKetThuc");
  }
  // End Get FormControl
}

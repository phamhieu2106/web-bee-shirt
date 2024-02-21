import { Component, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() nameAction: string;

  @Input() handleSubmit: any;

  constructor() {}

  public callParentFuntion() {
    this.handleSubmit();
  }
}

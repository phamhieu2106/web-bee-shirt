import { Component, Input } from "@angular/core";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  @Input() formHeader: string;
  @Input() formButton: string;
}

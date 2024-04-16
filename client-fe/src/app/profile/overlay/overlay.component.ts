import { Component, Input } from "@angular/core";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.css"],
})
export class OverlayComponent {
  @Input() text: string;
}

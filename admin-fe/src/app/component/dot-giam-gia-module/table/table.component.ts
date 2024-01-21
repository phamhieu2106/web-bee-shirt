import { Component, Input } from "@angular/core";
import { DotGiamGia } from "src/app/interface/dot-giam-gia";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent {
  @Input() titleTable: string;
  @Input() tHead: Array<string>;
  @Input() detail: Function;
  @Input() update: Function;
  @Input() listObject: DotGiamGia[];
}

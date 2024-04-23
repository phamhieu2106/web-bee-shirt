import { Component, Input } from "@angular/core";

@Component({
  selector: "app-main-heading",
  templateUrl: "./main-heading.component.html",
  styleUrls: ["./main-heading.component.css"],
})
export class MainHeadingComponent {
  @Input() mainHeading: string;
  @Input() title: string;
  @Input() icon: string;
  public isNoticesShow: boolean = false;

  public toggleNotices(): void {
    this.isNoticesShow = !this.isNoticesShow;
   
  }
}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NgOnInitService {
  constructor() {}

  // Phương thức để gọi lại ngOnInit()
  callNgOnInit(component: any) {
    if (component && typeof component.ngOnInit === "function") {
      component.ngOnInit();
    }
  }
}

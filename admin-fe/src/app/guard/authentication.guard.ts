import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { ToastrService } from "ngx-toastr";

import { AuthenticationService } from "../service/authentication.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authenticationService = inject(AuthenticationService);

  const isLoggedIn = authenticationService.isLoggedIn();
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(["/login"]);
    toastr.warning(
      "Bạn cần đăng nhập để sử dụng dịch vụ của chúng tôi",
      "Hệ thống"
    );
    return false;
  }
};

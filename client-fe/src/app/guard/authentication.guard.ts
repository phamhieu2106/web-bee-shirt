import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { AuthenticationService } from "../service/authentication.service";
import { NotificationService } from "../service/notification.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const notifService = inject(NotificationService);
  const authenService = inject(AuthenticationService);

  const isLoggedIn = authenService.isLoggedIn();
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(["/log-in"]);
    notifService.warning("Bạn cần đăng nhập để truy cập trang này");
    return false;
  }
};

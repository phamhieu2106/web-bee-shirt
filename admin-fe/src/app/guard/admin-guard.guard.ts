import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { AuthenticationService } from "../service/authentication.service";
import { NotificationService } from "../service/notification.service";

export const adminAuthenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const notifService = inject(NotificationService);
  const authenticationService = inject(AuthenticationService);

  const isLoggedIn = authenticationService.isLoggedIn();
  const loggedCust = authenticationService.getUserFromStorage();
  if (isLoggedIn && loggedCust.account.role === "ROLE_ADMIN") {
    return true;
  } else if (isLoggedIn && loggedCust.account.role === "ROLE_STAFF") {
    router.navigate(["/thong-ke"]);
    notifService.error("Bạn không có quyền truy cập vào trang này!");
    return false;
  } else {
    router.navigate(["/log-in"]);
    notifService.error("Bạn cần đăng nhập để truy cập trang này!");
    return false;
  }
};

// import { Injectable } from "@angular/core";
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from "@angular/common/http";
// import { Observable } from "rxjs";

// @Injectable()
// export class AuthenticationInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     return next.handle(request);
//   }
// }

import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ignore requests that don't need authentication (e.g., login)
    const authUrl = `http://localhost:8080/auth/client`;
    const productUrl = `http://localhost:8080/san-pham/client`;
    const imageUrl = `http://localhost:8080/hinh-anh-sp/client`;
    const spct = `http://localhost:8080/spct/client`;
    const colorUrls = `http://localhost:8080/mau-sac/client`;
    const sizeUrls = `http://localhost:8080/kich-co/client`;
    const formUrls = `http://localhost:8080/kieu-dang/client`;
    const designUrls = `http://localhost:8080/thiet-ke/client`;
    const collarUrls = `http://localhost:8080/co-ao/client`;
    const sleeveUrls = `http://localhost:8080/tay-ao/client`;
    const materialUrls = `http://localhost:8080/chat-lieu/client`;
    const saleEventlUrls = `http://localhost:8080/dot-giam-gia/client`;
    const discountUrls = `http://localhost:8080/phieu-giam-gia/client`;
    const notificationUrls = `http://localhost:8080/api/notification`;
    const orderUrls = `http://localhost:8080/hoa-don/client`;

    if (
      request.url.startsWith(authUrl) ||
      request.url.startsWith(productUrl) ||
      request.url.startsWith(spct) ||
      request.url.startsWith(imageUrl) ||
      request.url.startsWith(colorUrls) ||
      request.url.startsWith(sizeUrls) ||
      request.url.startsWith(formUrls) ||
      request.url.startsWith(designUrls) ||
      request.url.startsWith(collarUrls) ||
      request.url.startsWith(sleeveUrls) ||
      request.url.startsWith(materialUrls) ||
      request.url.startsWith(saleEventlUrls) ||
      request.url.startsWith(discountUrls) ||
      request.url.startsWith(notificationUrls) ||
      request.url.startsWith(orderUrls)
    ) {
      return next.handle(request);
    }

    if (request.url.startsWith(authUrl)) {
      return next.handle(request);
    }

    // Set token for other requests
    let authReq = request;
    this.authenticationService.loadTokenFromStorage();
    const token = this.authenticationService.getTokenFromStorage();

    if (token != null) {
      authReq = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`),
      });
    }

    // authReq = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    return next.handle(authReq);
  }
}

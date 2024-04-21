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
    const loginUrl = `http://localhost:8080/auth`;
    const productUrl = `http://localhost:8080/san-pham`;
    const imageUrl = `http://localhost:8080/hinh-anh-sp`;
    const spct = `http://localhost:8080/spct`;
    const colorUrls = `http://localhost:8080/mau-sac`;
    const sizeUrls = `http://localhost:8080/kich-co`;
    const formUrls = `http://localhost:8080/kieu-dang`;
    const designUrls = `http://localhost:8080/thiet-ke`;
    const collarUrls = `http://localhost:8080/co-ao`;
    const sleeveUrls = `http://localhost:8080/tay-ao`;
    const materialUrls = `http://localhost:8080/chat-lieu`;
    const saleEventlUrls = `http://localhost:8080/dot-giam-gia`;
    const discountUrls = `http://localhost:8080/phieu-giam-gia`;

    // if (request.url.includes(loginUrl)) {
    //   return next.handle(request);
    // }

    if (
      request.url.startsWith(loginUrl) ||
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
      request.url.startsWith(discountUrls)
    ) {
      return next.handle(request);
    }

    // Set token for other requests
    this.authenticationService.loadTokenFromStorage();
    const token = this.authenticationService.getTokenFromStorage();

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authRequest);
  }

  // private checkUrl(urls: string, request: string): boolean {
  //   for (let url of urls) {
  //     if (url.startsWith(request)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}

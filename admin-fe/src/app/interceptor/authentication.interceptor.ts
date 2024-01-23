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
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    // bỏ qua các request này. Vì các request này không cần token
    const login = `http://localhost:8080/auth/login`;

    if (request.url.includes(login)) {
      return httpHandler.handle(request);
    }

    // set token cho các request còn lại
    this.authenticationService.loadTokenFromStorage();
    const token = this.authenticationService.getTokenFromStorage();
    console.log("token: ", token);

    const cloneRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return httpHandler.handle(cloneRequest);
  }
}

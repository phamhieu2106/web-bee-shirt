import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { ChatLieu } from "../model/class/chat-lieu.class";

@Injectable({
  providedIn: "root",
})
export class ChatLieuService {
  private readonly apiUrl = "http://localhost:8080/chat-lieu";

  constructor(private http: HttpClient) {}

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<ChatLieu>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<ChatLieu>>(
      `${this.apiUrl}/get-all${param}`
    );
  }
}

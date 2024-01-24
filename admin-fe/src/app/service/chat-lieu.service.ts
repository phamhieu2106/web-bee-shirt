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

  // public functions
  // 1
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

  // 2
  public add(chatLieu: ChatLieu): Observable<ChatLieu> {
    return this.http.post<ChatLieu>(`${this.apiUrl}/add`, chatLieu);
  }

  // 3
  public getById(id: number): Observable<ChatLieu> {
    return this.http.get<ChatLieu>(`${this.apiUrl}/get-by-id/${id}`);
  }
}

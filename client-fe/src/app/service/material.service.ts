import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ChatLieu } from "../model/class/chat-lieu.class";

@Injectable({
  providedIn: "root",
})
export class MaterialService {
  private readonly apiUrl = "http://localhost:8080/chat-lieu";

  // constructor, ngOn
  constructor(private http: HttpClient) {}

  // public functions
  // 1
  public getAllActive(): Observable<ChatLieu[]> {
    return this.http.get<ChatLieu[]>(`${this.apiUrl}/all-active`);
  }
}

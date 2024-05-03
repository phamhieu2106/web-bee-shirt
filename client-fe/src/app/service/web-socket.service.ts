import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  webSocket!: WebSocket;
  messages: string[] = [];

  public openWebSocket() {
    this.webSocket = new WebSocket("ws://localhost:8080/notification2");
    this.webSocket.onopen = (event) => {};
    this.webSocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      this.messages.push(msg);
    };
    this.webSocket.onclose = (event) => {};
  }

  public sendMessage(message: string) {
    this.webSocket.send(JSON.stringify(message));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}

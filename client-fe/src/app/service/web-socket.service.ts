import { Injectable } from "@angular/core";

import { ChatMessage } from "../model/class/chat-msg.class";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];

  public openWebSocket() {
    this.webSocket = new WebSocket("ws://localhost:8080/notification");

    this.webSocket.onopen = (event) => {};

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {};
  }

  public sendMessage(chatMessage: ChatMessage) {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}

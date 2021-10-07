import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  socket: io.Socket;
  feedbackMessage: string = "";
  $customObservable: any;

  constructor() {
    this.socket = io.io(`http://localhost:3000/`);
    this.$customObservable = new Observable((observer) => {
      this.socket.on("message-sent", (data) => {
        observer.next(data);
      });
    });
  }

  sentMessage(msg: string) {
    this.feedbackMessage = msg;
    this.socket.emit("message-received", this.feedbackMessage);
  }

  getMessage() {}
}

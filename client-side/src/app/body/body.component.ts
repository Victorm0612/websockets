import { Component, OnDestroy, OnInit } from "@angular/core";
import * as io from "socket.io-client";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"],
})
export class BodyComponent implements OnInit, OnDestroy {
  socket: io.Socket;
  isDisabled: boolean = false;
  message: string = "";

  constructor(private socketService: SocketService) {
    //Su
    this.socketService.$customObservable.subscribe((data) => {
      this.message = data;
    });
  }

  //Disabled button
  changeState() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.socketService.closeConnection();
    } else {
      this.socketService.openConnection();
    }
  }

  //Send the message
  saveMessage() {
    this.socketService.sentMessage(this.message);
  }

  //
  ngOnDestroy() {
    this.socketService.$customObservable.unsubscribe();
  }

  ngOnInit() {}
}

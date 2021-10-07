import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChatService } from "src/app/chat.service";
import { Message } from "src/app/models/Message.model";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = "";
  username: string = "";

  messageList: Message[];
  users: string[] = [];
  private usersSub: Subscription;
  private msgSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.messageList = this.chatService.getMessages();
    this.users = this.chatService.getUsers();

    this.msgSub = this.chatService.messagesEvent.subscribe((messages: Message[]) => {
      this.messageList = messages;
    });

    this.usersSub = this.chatService.usersEvent.subscribe((users: string[]) => {
      this.users = users;
    });
  }

  usernameUpdate(name: string): void {
    this.username = name;
    this.chatService.usernameUpdate(name);
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = "";
  }

  ngOnDestroy(): void {
    this.msgSub.unsubscribe();
    this.usersSub.unsubscribe();
  }

}

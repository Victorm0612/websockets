import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/chat.service";
import { Message } from "src/app/models/Message.model";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  message: string = "";
  users: string[] = [];
  messageList: Message[];
  username: string = "";

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messageList = this.chatService.getMessages();
    this.users = this.chatService.getUsers();

    this.chatService.messagesEvent.subscribe((messages: Message[]) => {
      this.messageList = messages;
    });

    this.chatService.usersEvent.subscribe((users: string[]) => {
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
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { Message } from "./models/Message.model"


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messagesEvent = new Subject<Message[]>();
  usersEvent = new Subject<string[]>();

  username: string = '';
  private messageList: Message[] = [];
  users: string[] = [];
  socket: io.Socket;

  getMessages() {
    return this.messageList.slice();
  }

  getUsers() {
    return this.users;
  }

  usernameUpdate(name: string): void {

    this.socket = io.io(`localhost:3000?username=${name}`);
    this.username = name;
    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (users: string[]) => {
      this.users = users;
      this.usersEvent.next(this.users);
    });

    this.socket.on('message-broadcast', (data: { message: string, username: string }) => {
      if (data) {
        this.messageList.push(new Message(data.message, data.username, false));
        this.messagesEvent.next(this.messageList.slice());
      }
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
    this.messageList.push(new Message(message, this.username, true));
    this.messagesEvent.next(this.messageList.slice());
  }
}

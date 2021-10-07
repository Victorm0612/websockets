import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-usernname',
  templateUrl: './usernname.component.html',
  styleUrls: ['./usernname.component.scss']
})
export class UsernnameComponent {
  @Output() usernameEvent = new EventEmitter<string>();

  username = '';

  constructor() { }

  setusername(): void {
    this.usernameEvent.emit(this.username);
  }

}

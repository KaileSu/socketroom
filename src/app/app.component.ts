import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'app';
  message: string;
  messages: string[] = [];
  rooms: string[] = [];
  selectedRoom = '';
  firstRoomMessage: string;
  serRes = '';
  roomMessage: string;
  roomMessages: string[] = [];
  chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }
  /*
  Uncaught ReferenceError: global is not defined
   resolved by angular/angular-cli#8160 (comment)
   add polyfills.ts:
   (window as any).global = window;
   */

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  roomList() {
    this.chatService.reqRoomList();
   // this.rooms = this.chatService.allrooms;
   // console.log('tttt' + JSON.stringify(this.rooms));
    this.chatService.getRoomlist().subscribe((m: string) => {
    this.rooms = JSON.parse(m);
    });
  }

  onSelect(room): void {
    this.selectedRoom = room;
    // this.chatService.reqJoin(this.selectedRoom);
    }
  joinInRoom(): void {
    this.chatService.reqJoin(this.selectedRoom);
    this.serRes = 'waiting for response for room ' + this.selectedRoom ;
    this.chatService.getInitMessages().subscribe((m: string) => {
        this.firstRoomMessage = m;
        console.log(m);
    });
  }
  watchRoomMessage() {
    this.chatService.getRoomMessages().subscribe((m: string) => {
      this.roomMessages.push(m);
    });

  }
  sendRoomMessage() {
    this.chatService.sendRoomMessage(this.roomMessage);
    console.log('room-message:' + this.roomMessage);
    this.roomMessage = '';
  }

  ngOnInit() {
    this.chatService
      .getMessages().subscribe((m: string) => {
        this.messages.push(m);
      });
    console.log(this.selectedRoom);


  }



}

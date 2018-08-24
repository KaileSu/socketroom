import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Chatting Room';
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
    

  }



}

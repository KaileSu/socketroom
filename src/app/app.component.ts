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
  
  roomList() {
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
  }
  
  sendRoomMessage() {
    this.chatService.sendRoomMessage(this.roomMessage);
    console.log('room-message:' + this.roomMessage);
    this.roomMessage = '';
  }

  ngOnInit() {

    this.roomList();

    this.chatService.getNewRoom().subscribe((m: string) => {
      this.rooms.push(m);
    });

    this.chatService.getRoomMessages().subscribe((m: string) => {
      this.roomMessages.push(m);
    });

    this.chatService.getInitMessages().subscribe((m: string) => {
      this.firstRoomMessage = m;
      console.log(m);
    });

  }



}

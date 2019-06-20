import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Chatting Rooms';
  rooms: string[] = [];
  selectedRoom = '';
  firstRoomMessage: string;
  roomMessage: string;
  roomMessages = [];
  chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }
  
  roomList() {
    this.chatService.getRoomlist().subscribe((m: string) => {
    this.rooms = JSON.parse(m);
    this.rooms.forEach((item, index) => {
      if (this.roomMessages[index] == null) {
        this.roomMessages[index] = [item];
      } 
     });      
    });
  }

  onSelect(room): void {
    this.selectedRoom = room;
    // this.chatService.reqJoin(this.selectedRoom);
  }
  
  joinInRoom(): void {
    this.chatService.reqJoin(this.selectedRoom);
  }
  
  sendRoomMessage() {
    this.chatService.sendRoomMessage(this.roomMessage);
    console.log('room-message:' + this.roomMessage);
    this.roomMessage = '';
  }

  ngOnInit() {

    this.roomList();

    this.chatService.getNewRoom().subscribe((m: string) => {
      if (this.rooms.indexOf(m) == -1) {
        this.rooms.push(m);
        this.roomMessages.push([m]);
      }
      
    });

   /* if use socket.on directively:
   this.chatService.socket.on('newRoom', m=> {
      this.rooms.push(m);
    });
    */

    this.chatService.getRoomMessages().subscribe((m: string) => {
      let t3 = JSON.parse(m);
      console.log(t3);
      this.roomMessages.forEach((item, index) =>{ 
        if (item[0]==t3[2]) {
          this.roomMessages[index].push(t3[1] + ' : ' + t3[0]);
        }
      });
    });

    this.chatService.getInitMessages().subscribe((m: string) => {
      this.firstRoomMessage = m;
      console.log(m);
    });

  }



}

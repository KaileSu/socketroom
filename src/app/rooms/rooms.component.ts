import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  chatService: ChatService;
  rooms: string[] = [];
  selectedRoom: string;
  firstRoomMessage: string;
  serRes = '';
  constructor(chatService: ChatService) {
    this.chatService = chatService;
    this.rooms = this.chatService.allrooms;
  }


  onSelect(room: string): void {
  this.selectedRoom = room;
  // this.chatService.reqJoin(this.selectedRoom);
  }
  joinInRoom(): void {
     this.chatService.reqJoin(this.selectedRoom);
     console.log('selectedRoom:' + this.selectedRoom);
     this.serRes = 'waiting for response:' + this.selectedRoom ;


  }

  ngOnInit() {
   /* console.log('ngOnInit woking:' + this.selectedRoom + this.serRes);
    this.chatService.getInitMessages(this.selectedRoom).subscribe((m: string) => {
      this.firstRoomMessage = m;
      console.log(m);
    });
    */



  }
}


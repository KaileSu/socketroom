import { Component, OnInit, Input } from '@angular/core';
// for input a room
import { ChatService } from '../chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  @Input() room: string[];
  roomMessage: string;
  roomMessages: string[] = [];
  chatService: ChatService;
  constructor(chatService: ChatService) {
    this.chatService = chatService;
   }
  sendRoomMessage() {
    this.chatService.sendRoomMessage(this.roomMessage);
    console.log('room:' + this.room + ' message: ' + this.roomMessage);
    this.roomMessage = '';
  }

  ngOnInit() {
    /* this.chatService.getRoomMessages(this.room).subscribe((m: string) => {
      this.roomMessages.push(m);
    });
    */
  }

}

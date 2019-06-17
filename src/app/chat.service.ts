import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// npm install @types/socket.io-client
import {Router} from '@angular/router'; // may not be used in this project

import { Observable } from 'rxjs';
// no working import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  allrooms: string[] = [];
  joinedrooms: string[] = [];
  currentroom: string;

  constructor(private router: Router) {
      this.socket = io(this.url);
      this.socket.emit('test', 'hello world');
      // for test
  }



// request join a room
  public reqJoin(roomid) {
    this.socket.emit('room', roomid);
     this.joinedrooms.push(roomid);
     this.currentroom = roomid;
  }

  public getRoomlist = () => {
    return Observable.create((observer) => {
        this.socket.on('roomlist', (message) => {
            observer.next(message);
        });
    });
  }

  public getNewRoom = () => {
    return Observable.create((observer) => {
        this.socket.on('newRoom', (message) => {
            observer.next(message);
        });
    });
  }

  

  


  public sendRoomMessage(m) {
    this.socket.emit('new-room-message', m);
    console.log('new-room-message:' + m);
  }

  public getRoomMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-room-message', (m) => {
            observer.next(m);
        });
    });
  }

  public getInitMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('init-message', (m) => {
            observer.next(m);
        });
    });
  }
}

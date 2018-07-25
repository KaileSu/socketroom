import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// npm install @types/socket.io-client

import { Observable } from 'rxjs';
// no working import { Observable } from 'rxjs/Observable'



@Injectable({
  providedIn: 'root'
})


export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
      this.socket = io(this.url);
      this.socket.emit('test', 'hello world');
      // for testing
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
  }
}

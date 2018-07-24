import { Component } from '@angular/core';
import { ChatService } from './chat.service';
// for injecting ChatService in the component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message: string;
  messages: string[] = [];

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

  ngOnInit() {
    this.chatService
      .getMessages().subscribe((message: string) => {
        this.messages.push(message);
      });
  }

}

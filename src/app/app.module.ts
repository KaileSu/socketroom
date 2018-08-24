import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
// added for form

import { HttpModule } from '@angular/http';
// for http

import { ChatService } from './chat.service';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { AppRoutingModule } from './/app-routing.module';
// created service


@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }

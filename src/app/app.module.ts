import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
// added for form

// import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
// use httpclientmodule

// import { ChatService } from './chat.service';

import { AppRoutingModule } from './app-routing.module';
// created service


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

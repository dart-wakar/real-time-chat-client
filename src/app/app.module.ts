import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SocketIoModule,SocketIoConfig} from 'ng-socket-io';

import {AppRoutingModule} from './app.routing';

import { AppComponent } from './app.component';
import {ChatRoomComponent} from './components/chat-room/chat-room.component';

import {ChatRoomService} from './services/chat-room.service';

const socketConfig: SocketIoConfig = {url: 'http://localhost:3000',options: {}};

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
    ChatRoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

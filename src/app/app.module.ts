import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SocketIoModule,SocketIoConfig} from 'ng-socket-io';

import {AppRoutingModule} from './app.routing';

import { AppComponent } from './app.component';
import {ChatRoomComponent} from './components/chat-room/chat-room.component';
import {MessageListComponent} from './components/message-list/message-list.component';
import {MessageComponent} from './components/message/message.component';
import {LoginComponent} from './components/login/login.component';
import {UserStatusComponent} from './components/user-status/user-status.component';

import {ChatRoomService} from './services/chat-room.service';
import {UserService} from './services/user.service';

const socketConfig: SocketIoConfig = {url: 'http://localhost:3000',options: {}};

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    MessageListComponent,
    MessageComponent,
    LoginComponent,
    UserStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
    ChatRoomService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
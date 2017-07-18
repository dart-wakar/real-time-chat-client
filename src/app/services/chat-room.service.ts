import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Socket} from 'ng-socket-io';

@Injectable()
export class ChatRoomService {
     
     constructor(private socket: Socket) {}

     getMessage() {
         return this.socket.fromEvent<any>('msg')
                            .map(data => data);
     }

     sendMessage(msg: string) {
         this.socket.emit('msg',msg);
     }

     login(username: string) {
         this.socket.emit('login',username);
     }

     getNewUserConnection() {
         return this.socket.fromEvent<any>('new user connected')
                            .map(data => data);
     }

     getInitialMessages() {
         return this.socket.fromEvent<any>('initial messages')
                            .map(data => data);
     }

     userDisconnected() {
         return this.socket.fromEvent<any>('user disconnect')
                            .map(data => data);
     }

     userTyping(message: any) {
         this.socket.emit('user typing',message);
     }

     getUserTyping() {
         return this.socket.fromEvent<any>('typing now')
                            .map(data => data);
     }

     stopUserTyping(msg: any) {
         this.socket.emit('stop typing',msg);
     }

     getStoppedTyping() {
         return this.socket.fromEvent<any>('stopped typing')
                            .map(data => data);
     }

     getUserOffline() {
         return this.socket.fromEvent<any>('offline user')
                            .map(data => data);
     }

     doPrivateChat(user: any) {
         this.socket.emit('do private chat',user);
     }

     getGoToPrivateChat() {
         return this.socket.fromEvent<any>('go to private chat')
                            .map(data => data);
     }

     sendPrivateMessage(message: any,otherUserId: any) {
         this.socket.emit('send private message',{message: message,otherUserId: otherUserId});
     }

     getPrivateMessage() {
         return this.socket.fromEvent<any>('got private message')
                            .map(data => data);
     }

     sendRequestForRoomName(otherUserId: any) {
         this.socket.emit('request for room name',otherUserId);
     }

     getCurrentRoomName() {
         return this.socket.fromEvent<any>('take room name')
                            .map(data => data);
     }
     
}
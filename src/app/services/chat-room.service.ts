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
     
}
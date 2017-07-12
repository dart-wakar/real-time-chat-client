import {Component,OnInit,OnChanges} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html'
})

export class ChatRoomComponent implements OnInit {

    componentName = 'Chat room';
    msgs: any[];
    msgInp:any;
    typingTimer: any;
    someoneTyping: boolean;
    typingUser: any;

    constructor(private chatRoomService: ChatRoomService) {}

    ngOnInit() {
        this.msgs = [];
        this.someoneTyping = false;
        this.chatRoomService.getInitialMessages()
                            .subscribe(data => {
                                console.log(data);
                                this.msgs = data;
                            });
        this.chatRoomService.getMessage()
                            .subscribe(msg => {
                                this.msgs.push(msg);
                            });
        this.chatRoomService.getNewUserConnection()
                            .subscribe(data => {
                                console.log(data);
                                this.msgs.push(data);
                            });
        this.chatRoomService.userDisconnected()
                            .subscribe(data => {
                                this.msgs.push(data);
                            });
        this.chatRoomService.getUserTyping()
                            .subscribe(data => {
                                this.someoneTyping = true;
                                this.typingUser = data.username;
                            });
        this.chatRoomService.getStoppedTyping()
                            .subscribe(data => {
                                this.someoneTyping = false;
                                //this.typingUser = null;
                            })
    }

    sendMsg(msg) {
        this.msgInp = '';
        this.chatRoomService.sendMessage(msg);
    }

    userTyping(message: any) {
        clearTimeout(this.typingTimer);
        this.chatRoomService.userTyping(message);
        this.typingTimer = setTimeout(this.doneTyping(this),3000);
    }

    doneTyping(x: any){
        console.log('doneTyping',x);
        x.chatRoomService.stopUserTyping(this.msgInp);
        clearTimeout(x.typingTimer);
    }
    
}
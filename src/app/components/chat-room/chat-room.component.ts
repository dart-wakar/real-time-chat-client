import {Component,OnInit,OnChanges,OnDestroy} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';
import {MessageService} from '../../services/message.service';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent implements OnInit,OnDestroy {

    componentName = 'Chat room';
    msgs: any[];
    msgInp:any;
    typingTimer: any;
    someoneTyping: boolean;
    typingUser: any;

    constructor(private chatRoomService: ChatRoomService,private messageService: MessageService) {}

    ngOnInit() {
        this.msgs = [];
        this.someoneTyping = false;
        this.messageService.getAllMessages()
                            .subscribe(messages => {
                                console.log(messages);
                                this.msgs = messages;
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

    ngOnDestroy() {
        console.log('destroyed');
    }

    sendMsg(msg) {
        this.msgInp = '';
        this.chatRoomService.sendMessage(msg);
    }

    userTyping(message: any) {
        clearTimeout(this.typingTimer);
        this.chatRoomService.userTyping(message);
        var x = this;
        this.typingTimer = setTimeout(function() {
            x.chatRoomService.stopUserTyping(x.msgInp);
            clearTimeout(x.typingTimer);
        },2000);
    }
    
}
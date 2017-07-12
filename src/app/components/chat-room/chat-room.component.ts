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

    constructor(private chatRoomService: ChatRoomService) {}

    ngOnInit() {
        this.msgs = [];
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
                            })
    }

    sendMsg(msg) {
        this.msgInp = '';
        this.chatRoomService.sendMessage(msg);
    }
    
}
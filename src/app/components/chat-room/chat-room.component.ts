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
        this.chatRoomService.getMessage()
                            .subscribe(msg => {
                                this.msgs.push(msg);
                            });
    }

    sendMsg(msg) {
        this.msgInp = '';
        this.chatRoomService.sendMessage(msg);
    }
    
}
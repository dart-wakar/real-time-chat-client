import {Component,OnInit} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html'
})

export class ChatRoomComponent implements OnInit {

    componentName = 'Chat room';
    msg: string;

    constructor(private chatRoomService: ChatRoomService) {}

    ngOnInit() {
        this.chatRoomService.getMessage()
                            .subscribe(msg => {
                                this.msg = "1st "+msg;
                            });
    }

    sendMsg(msg) {
        this.chatRoomService.sendMessage(msg);
    }
    
}
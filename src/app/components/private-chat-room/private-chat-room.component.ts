import {Component,OnInit} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';
import {RoomService} from '../../services/room.service';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
    selector: 'private-chat-room',
    templateUrl: './private-chat-room.component.html'
})

export class PrivateChatRoomComponent implements OnInit {

    otherUserId: any;
    inputMessage: any;
    messages: any;
    room: any;
    roomId: any;

    constructor(private chatRoomService: ChatRoomService,private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.messages = [];
        this.getOtherUserFromParams();
        console.log(this.otherUserId);
        this.chatRoomService.sendRequestForRoomName(this.otherUserId);
        this.chatRoomService.getCurrentRoomName()
            .subscribe(data => {
                console.log(data);
                this.room = data;
                this.roomId = data._id;
                console.log(this.room);
            })
        this.chatRoomService.getPrivateMessage()
            .subscribe(data => {
                console.log(data);
                this.messages.push(data);
            });
        /*this.chatRoomService.getGoToPrivateChat()
            .subscribe(data => console.log(data.room));*/
    }

    getOtherUserFromParams() {
        this.otherUserId = this.activatedRoute.snapshot.params['other_user_id'];
    }

    sendMessage(msg: any) {
        this.chatRoomService.sendPrivateMessage(msg,this.otherUserId);
        this.inputMessage = '';
    }
}
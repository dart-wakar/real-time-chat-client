import {Component,OnInit} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';
import {MessageService} from '../../services/message.service';
import {RoomService} from '../../services/room.service';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
    selector: 'private-chat-room',
    templateUrl: './private-chat-room.component.html',
    styleUrls: ['./private-chat-room.component.css']
})

export class PrivateChatRoomComponent implements OnInit {

    otherUserId: any;
    inputMessage: any;
    messages: any;
    room: any;
    roomId: any;
    someoneTyping: boolean;
    typingUser: any;
    typingTimer: any;

    constructor(private chatRoomService: ChatRoomService,private messageService: MessageService,private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.someoneTyping = false;
        this.messages = [];
        this.getOtherUserFromParams();
        console.log(this.otherUserId);
        this.chatRoomService.sendRequestForRoomName(this.otherUserId);
        this.chatRoomService.getCurrentRoomName()
            .subscribe(data => {
                console.log(data);
                this.room = data;
                this.roomId = data._id;
                console.log(this.roomId);
                this.messageService.getAllMessagesForRoom(this.roomId)
                    .subscribe(msgs => {
                        console.log(msgs);
                        this.messages = msgs;
                    });
            });
        this.chatRoomService.getPrivateMessage()
            .subscribe(data => {
                console.log(data);
                this.messages.push(data.message);
            });

        this.chatRoomService.getUserTypingInPrivate()
                            .subscribe(data => {
                                this.someoneTyping = true;
                                this.typingUser = data.username;
                            });
        this.chatRoomService.getUserStoppedTypingInPrivate()
                            .subscribe(data => {
                                this.someoneTyping = false;
                                //this.typingUser = null;
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

    userTyping(message: any) {
        clearTimeout(this.typingTimer);
        this.chatRoomService.userTypingInPrivateRoom(message,this.room.name);
        var x = this;
        this.typingTimer = setTimeout(function() {
            x.chatRoomService.stopUserTypingInPrivateRoom(x.inputMessage,x.room.name);
            clearTimeout(x.typingTimer);
        },2000);
    }
}
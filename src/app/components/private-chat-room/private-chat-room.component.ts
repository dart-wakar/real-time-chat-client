import {Component,OnInit} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';
import {ActivatedRoute,Params,Router} from '@angular/router';

@Component({
    selector: 'private-chat-room',
    templateUrl: './private-chat-room.component.html'
})

export class PrivateChatRoomComponent implements OnInit {

    otherUserId: any;

    constructor(private chatRoomService: ChatRoomService,private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.getOtherUserFromParams();
        console.log(this.otherUserId);
    }

    getOtherUserFromParams() {
        this.otherUserId = this.activatedRoute.snapshot.params['other_user_id'];
    }
}
import {Component,OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ChatRoomService} from '../../services/chat-room.service';

@Component({
    selector: 'user-status',
    templateUrl: './user-status.component.html'
})

export class UserStatusComponent implements OnInit {

    onlineUsers: any;
    offlineUsers: any;

    constructor(private userService: UserService,private chatRoomService: ChatRoomService) {}

    ngOnInit() {
        this.onlineUsers = [];
        this.offlineUsers = [];
        this.userService.getOnlineUsers()
            .subscribe(onlineUsers => {
                console.log(onlineUsers);
                this.onlineUsers = onlineUsers;
            });
        this.userService.getOfflineUsers()
            .subscribe(offlineUsers => {
                console.log(offlineUsers);
                this.offlineUsers = offlineUsers;
            });
        this.chatRoomService.getNewUserConnection()
            .subscribe(data => {
                console.log(data);
                this.onlineUsers.push(data.user);
            });
        this.chatRoomService.getUserOffline()
            .subscribe(data => {
                console.log(data);
                this.offlineUsers.push(data.user);
            })
    }

}
import {Component,OnInit,OnChanges} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ChatRoomService} from '../../services/chat-room.service';
import {UserStatusHandler} from '../../classes/user-status.handler';

@Component({
    selector: 'user-status',
    templateUrl: './user-status.component.html'
})

export class UserStatusComponent implements OnInit,OnChanges {

    onlineUsers: any;
    offlineUsers: any;
    userStatusHandler: UserStatusHandler;

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
                this.userStatusHandler = new UserStatusHandler(this.onlineUsers,this.offlineUsers);
            });
        this.chatRoomService.getNewUserConnection()
                .subscribe(data => {
                    if(this.userStatusHandler !== undefined) {
                        console.log(data);
                        this.onlineUsers.push(data.user);
                        this.userStatusHandler.userCameOnline(data.user);
                        console.log(this.userStatusHandler.getOfflineUsers());
                        console.log(this.userStatusHandler.getOfflineUsersIds());
                        console.log(this.userStatusHandler.getOnlineUsers());
                        console.log(this.userStatusHandler.getOnlineUsersIds());
                    }                    
                });
            this.chatRoomService.getUserOffline()
                .subscribe(data => {
                    if(this.userStatusHandler !== undefined) {
                        console.log(data);
                        this.offlineUsers.push(data.user);
                        this.userStatusHandler.userWentOffline(data.user);
                        console.log(this.userStatusHandler.getOfflineUsers());
                        console.log(this.userStatusHandler.getOfflineUsersIds());
                        console.log(this.userStatusHandler.getOnlineUsers());
                        console.log(this.userStatusHandler.getOnlineUsersIds());
                    }
                });
    }

    ngOnChanges() {

    }

}
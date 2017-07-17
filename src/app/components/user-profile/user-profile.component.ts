import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import {ChatRoomService} from '../../services/chat-room.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html'
})

export class UserProfileComponent implements OnInit {

    userData: any;
    userStatus: any;
    ifNotCurrentUser: boolean;

    constructor(private userService: UserService,private chatRoomService: ChatRoomService,private activatedRoute: ActivatedRoute,private location: Location,private router: Router) {}

    ngOnInit() {
        this.getUserProfileDataFromRoute();
        this.chatRoomService.getGoToPrivateChat()
            .subscribe(data => {
                console.log(data);
                this.router.navigate(['/privatechat',data.other_user._id]);
            });
    }

    getUserProfileDataFromRoute() {
        this.activatedRoute.params.switchMap((params: Params) => this.userService.getUserProfile(params['user_id']))
            .subscribe(user => {
                console.log(user);
                this.userData = user;
                this.ifNotCurrentUser = (this.userData._id === localStorage.getItem("currentUserId")) ? false : true;
                this.userStatus = (this.userData.status === 2) ? 'Online' : 'Offline';
            },err => console.log(err));
    }

    goBack() {
        this.location.back();
    }

    goToPrivateChat() {
        this.chatRoomService.doPrivateChat(this.userData);
    }
}
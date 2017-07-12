import {Component,OnInit} from '@angular/core';
import {ChatRoomService} from '../../services/chat-room.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    username: string;

    constructor(private chatRoomService: ChatRoomService,private router: Router) {}

    ngOnInit() {
        this.chatRoomService.getNewUserConnection()
                            .subscribe(data => {
                                console.log(data);
                            });
    }

    login() {
        this.chatRoomService.login(this.username);
        this.router.navigate(['/chatroom']);
    }
}
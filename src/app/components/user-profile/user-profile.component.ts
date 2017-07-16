import {Component,OnInit} from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html'
})

export class UserProfileComponent implements OnInit {

    userData: any;
    userStatus: any;

    constructor(private userService: UserService,private activatedRoute: ActivatedRoute,location: Location,private router: Router) {}

    ngOnInit() {
        this.getUserProfileDataFromRoute();
    }

    getUserProfileDataFromRoute() {
        this.activatedRoute.params.switchMap((params: Params) => this.userService.getUserProfile(params['user_id']))
            .subscribe(user => {
                console.log(user);
                this.userData = user;
                this.userStatus = (this.userData.status === 2) ? 'Online' : 'Offline';
            },err => console.log(err));
    }
}
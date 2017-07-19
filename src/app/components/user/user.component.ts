import {Component,Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent {

    @Input() user: any;

    constructor(private router: Router) {}

    goToUserProfile(user: any) {
        this.router.navigate(['/users',user._id]);
    }

}
import {Component,Input} from '@angular/core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent {

    @Input() users: any;

}
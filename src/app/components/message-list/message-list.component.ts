import {Component,Input} from '@angular/core';

@Component({
    selector: 'message-list',
    templateUrl: './message-list.component.html'
})

export class MessageListComponent {

    @Input() messages: any[];
    
}
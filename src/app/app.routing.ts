import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {ChatRoomComponent} from './components/chat-room/chat-room.component';

const routes: Routes = [
    {path: '',redirectTo: 'chatroom',pathMatch: 'full'},
    {path: 'chatroom',component: ChatRoomComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {ChatRoomComponent} from './components/chat-room/chat-room.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
    {path: '',redirectTo: 'login',pathMatch: 'full'},
    {path: 'login',component: LoginComponent},
    {path: 'chatroom',component: ChatRoomComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
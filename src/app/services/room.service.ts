import {Injectable} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {BASE_URL,API_URL} from '../Constants';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RoomService {

    private RoomsUrl = API_URL+"rooms/";
    private RoomUrl = API_URL+"room/";

    constructor(private http: Http) {}

    getRoomFromRoomName(roomName: string) {
        return this.http.post(this.RoomUrl+"fromroomname/",JSON.stringify({room_name: roomName}))
            .map((res) => res.json())
            .catch((err) => {
                console.log(err);
                return Observable.throw(err.json() || 'Server Error');
            });
    }
}
import {Injectable} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {BASE_URL,API_URL} from '../Constants';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class MessageService {

    private MessageUrl = API_URL+"messages/";

    constructor(private http: Http) {}

    getAllMessages() {
        return this.http.get(this.MessageUrl+"default/")
                        .map((res) => res.json())
                        .catch((err) => {
                            console.log(err);
                            return Observable.throw(err.json() || 'Server Error');
                        });
    }

    getAllMessagesForRoom(room_id: any) {
        let header = new Headers();
        header.append("Content-Type","application/json");
        return this.http.post(this.MessageUrl+"byroomid/",JSON.stringify({room_id: room_id}),{headers: header})
            .map((res) => {
                console.log(res.json());
                return res.json();
            })
            .catch((err) => {
                console.log(err);
                return Observable.throw(err.json() || 'Server Error');
            });
    }

    getPublicMessagesForUser(user_id: any) {
        let header = new Headers();
        header.append("Content-Type","application/json");
        return this.http.post(this.MessageUrl+"publicforuser/",JSON.stringify({user_id: user_id}),{headers: header})
            .map((res) => {
                console.log(res.json());
                return res.json();
            })
            .catch((err) => {
                console.log(err);
                return Observable.throw(err.json() || 'Server Error');
            });
    }
    
}
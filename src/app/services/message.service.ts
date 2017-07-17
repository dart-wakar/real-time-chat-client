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
        return this.http.get(this.MessageUrl)
                        .map((res) => res.json())
                        .catch((err) => {
                            console.log(err);
                            return Observable.throw(err.json() || 'Server Error');
                        });
    }
    
}
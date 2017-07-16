import {Injectable} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {BASE_URL,API_URL} from '../Constants';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    private UsersUrl = API_URL+"users/";
    private UserUrl = API_URL+"user/";

    getAllUsers() {
        return this.http.get(this.UsersUrl)
                        .map((res) => res.json())
                        .catch((err) => {
                            console.log(err);
                            return Observable.throw(err.json() || 'Server Error');
                        });
    }

    getOnlineUsers() {
        return this.http.get(this.UsersUrl+"online/")
                        .map((res) => res.json())
                        .catch((err) => {
                            console.log(err);
                            return Observable.throw(err.json() || 'Server Error');
                        });
    }

    getOfflineUsers() {
        return this.http.get(this.UsersUrl+"offline/")
                        .map((res) => res.json())
                        .catch((err) => {
                            console.log(err);
                            return Observable.throw(err.json() || 'Server Error');
                        });
    }

    getUserProfile(user_id: string) {
        return this.http.get(this.UserUrl+user_id)
                        .map((res) => res.json())
                        .catch((err) => {
                            console.log(err);
                            return Observable.throw(err.json() || 'Server Error');
                        });
    }

}
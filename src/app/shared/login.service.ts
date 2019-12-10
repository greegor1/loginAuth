import { User } from '../login/user.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class LoginService implements OnInit {

    constructor(private http: HttpClient) {
    }
    
    ngOnInit() {

    }

    onAuthUser(users: User[], user: User) {  
        if (users.filter(({login, password}) => login === user.login && password === user.password).length > 0) {
            console.log('success');
        } else {
            console.log('user does not exist');
        }
    }

    onAddUser(user: User) {
        return this.http.post('api/users', user)
    }

    fetchUsers() {
        return this.http.get('api/users')
            .pipe(map(responseData => {
                const usersArr: User[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        usersArr.push({ ...responseData[key], id: Number(key) })
                    }
                }
                return usersArr
            }))
    }
}
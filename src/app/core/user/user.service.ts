import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(private _httpClient: HttpClient) {}

    set user(value: User)
    {
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    get(): Observable<User>
    {
        const headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem("accessToken")}`});

        return this._httpClient.get<User>('http://localhost:8081/fizmath/api/user/info', {headers}).pipe(
            tap((user) => {
                console.log(user);
                this._user.next(user);
            })
        );
    }

    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}

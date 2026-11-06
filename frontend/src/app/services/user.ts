import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Observable } from 'rxjs';

export interface User{
    id?:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phone:string;

}

@Injectable({
    providedIn:'root'
})
export class UserService {

    private apiUrl = '/api/users';

    constructor(private http:HttpClient){

    }

    registerUser(user:User):Observable<User>{

        return this.http.post<User>(`${this.apiUrl}/register`,user);
    }

    loginUser(email:string,password:string): Observable<any>{
        return this.http.post(`${this.apiUrl}/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`,{});
        // return this.http.post(`${this.apiUrl}/login`, { email, password });

    }
}

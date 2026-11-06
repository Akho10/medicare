import { HttpClient } from '@angular/common/http';
import { Injectable, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly userUrl = '/api/users';
    private readonly adminUrl = '/api/admin';
    readonly role = signal<'USER' | 'ADMIN' | null>(this.readStoredRole());

    constructor(private http: HttpClient) { }

    userLogin(email: string, password: string): Observable<any> {
        return this.http.post(`${this.userUrl}/login`, { email, password });

    }

    registerAdmin(admin: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.adminUrl}/register`, admin);
    }

    adminLogin(email: string, password: string): Observable<any> {
        // return this.http.post(`${this.adminUrl}/login`, { email, password });
        return this.http.post(`${this.adminUrl}/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`,{});

    }

    saveLogin(account:any,role:'USER' | 'ADMIN'): void{
        sessionStorage.setItem('medicareAccount',JSON.stringify(account));
        sessionStorage.setItem('medicareRole',role);
        this.role.set(role);
    }

    getRole() : 'USER' | 'ADMIN' | null{
        return this.role();
    }

    private readStoredRole(): 'USER' | 'ADMIN' | null {
        const role = sessionStorage.getItem('medicareRole');
        return role === 'USER' || role === 'ADMIN' ? role:null;
    }

    getAccount():any | null{

        const value = sessionStorage.getItem('medicareAccount');
        if(!value) return null;

        try{
            return JSON.parse(value);
        }catch{
            return null;
        }

        
    }

    logout() : void{
        sessionStorage.removeItem('medicareAccount');
        sessionStorage.removeItem('medicareRole');
        this.role.set(null);
    }
}

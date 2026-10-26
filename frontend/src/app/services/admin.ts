import { Injectable, Service } from '@angular/core';

export interface Admin{
    id?:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;

}

@Injectable({
    providedIn:'root'
})
export class Admin {}

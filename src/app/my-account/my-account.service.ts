import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { MyAccountModel } from "./my-account.model";


@Injectable({ providedIn: 'root' })
export class MyAccountService {    
    constructor(private http: HttpClient) { }

    getUserInfo() {
        const userData: {
            email: string;
            password: string;
            token: string;
        } = JSON.parse(localStorage.getItem('userData')!);

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + userData.token,
        });
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<MyAccountModel>('/userInfo/'+userData.email ,{
            headers: httpHeaders,    
        });
    }
}
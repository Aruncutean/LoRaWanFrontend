import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"


interface ResponseDate {
    message: string;
}


@Injectable({ providedIn: 'root' })
export class SingUpService {
    constructor(private http: HttpClient) { }

    setRol(email: string)
    {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<ResponseDate>('/api/setUserRol', {
            email: email,
        }, {
            headers: httpHeaders,
        });
    }

    singUp(lastName:string ,firstName:string,userName:string,email: string, password: string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<ResponseDate>('/api/addUser', {
            lastName:lastName,
            firstName:firstName,
            userName:userName,
            email: email,
            password: password
        }, {
            headers: httpHeaders,
        });
    }
}
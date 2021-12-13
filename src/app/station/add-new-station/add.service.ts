import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Subject } from "rxjs";



@Injectable({ providedIn: 'root' })
export class AddService {



    constructor(private http: HttpClient) { }


    postAdd(name: string, devEui: string, appEui: string, log: string, lat: string) {
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
        return this.http.post('/api/node/addNewNode', {
            userEmail: userData.email,
            name: name,
            devEui: devEui,
            appEui: appEui,
            lat: lat,
            log: log,
        }, { headers: httpHeaders, });

    }
}
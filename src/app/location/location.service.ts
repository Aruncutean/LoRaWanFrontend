import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { LocationModel } from "./location.model";


@Injectable({ providedIn: 'root' })
export class LocationService {

    constructor(private http: HttpClient) { }


    postLocation(name: string, rssi: number, log: string, lat: string) {
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
        return this.http.post<any>('/api/node/newLocation', {
            userEmail: userData.email,
            name: name,
            rssi: rssi,
            lat: lat,
            log: log,
        }, { headers: httpHeaders, });

    }


    getLocation() {
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
        return this.http.get<LocationModel[]>('/api/node/newLocation/'+userData.email, { headers: httpHeaders, });

    }

   
    getNodeName()
    {
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
        return this.http.get<string[]>('/node/getNodeName/'+userData.email, { headers: httpHeaders, });
    }

    getMessage(name:string)
    {
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
        return this.http.get<string[]>('/node/getLastMessage/'+name, { headers: httpHeaders, });
    }

}
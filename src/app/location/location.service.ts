import {Inject, Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { LocationModel } from "./location.model";


@Injectable({ providedIn: 'root' })
export class LocationService {
  private baseUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseUrl = baseUrl; }


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
        return this.http.post<any>(this.baseUrl + 'node/newLocation', {
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
        return this.http.get<LocationModel[]>(this.baseUrl + 'node/newLocation/'+userData.email, { headers: httpHeaders, });

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
        return this.http.get<string[]>(this.baseUrl + 'node/getNodeName/'+userData.email, { headers: httpHeaders, });
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
        return this.http.get<string[]>(this.baseUrl + 'node/getLastMessage/'+name, { headers: httpHeaders, });
    }

}

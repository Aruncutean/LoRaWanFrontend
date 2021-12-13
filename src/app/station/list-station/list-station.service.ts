import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Subject } from "rxjs";
import { Station } from "src/app/map/station.model";
import { getLocaleDayPeriods } from "@angular/common";
import { EmailValidator } from "@angular/forms";
import { ListStation } from "./list-station.model";



interface AuthResponseDate {
    jwt: string;
    message: string;
}


@Injectable({ providedIn: 'root' })
export class ListStationService {
   
   private auth=new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }


    getAllStation(email:string) {
        
        const userData:{
            email:string;
            password:string;
            token:string;
       }=JSON.parse(localStorage.getItem('userData')!);
      
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+userData.token,
        });
   
     
        return this.http.get<ListStation[]>('/api/node/getNodeByUser/'+email, {
            headers: httpHeaders,    
        });
    }
}
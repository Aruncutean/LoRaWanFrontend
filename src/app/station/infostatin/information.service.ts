import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Subject } from "rxjs";
import { Station } from "src/app/map/station.model";
import { getLocaleDayPeriods } from "@angular/common";
import { EmailValidator } from "@angular/forms";
import { InformationModel } from "./information.model";




interface AuthResponseDate {
    jwt: string;
    message: string;
}


@Injectable({ providedIn: 'root' })
export class InformationService {
   
   private auth=new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }


    getInformation(name:string) {
        
        const userData:{
            email:string;
            password:string;
            token:string;
       }=JSON.parse(localStorage.getItem('userData')!);
      
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+userData.token,
        });
     
        return this.http.get<InformationModel[]>('/api/node/getPayload/'+name, {
            headers: httpHeaders,    
        });
    }


    deleteNode(name:string) {
        
        const userData:{
            email:string;
            password:string;
            token:string;
       }=JSON.parse(localStorage.getItem('userData')!);
      
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer '+userData.token,
        });
     
        return this.http.delete('/api/node/deleteNode/'+name, {
            headers: httpHeaders,    
        });
    }
}
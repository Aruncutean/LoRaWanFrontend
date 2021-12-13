import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Subject } from "rxjs";
import { Station } from "src/app/map/station.model";
import { getLocaleDayPeriods } from "@angular/common";
import { EmailValidator } from "@angular/forms";




interface statistic {
    numberOfStation:number,
    stationActive:number,
    stationInactive:number,
    batteryLeve:number,
    humidity:number,
    temperature:number,
    airQuality:number
}


@Injectable({ providedIn: 'root' })
export class StatisticService {
   
 

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
     
        return this.http.get<statistic>('/api/node/getMyStation/'+email, {
            headers: httpHeaders,    
        });
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Subject } from "rxjs";
import { Station } from "../map/station.model";
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class MapService {

    node=new Subject<Station>();    
    
    
    constructor(private http: HttpClient) { }


    getAllStation() {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<Station[]>('/api/node/getAllNode' );
          
    }
}
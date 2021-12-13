import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { GraphModel } from "./graph.mpdel";


@Injectable({ providedIn: 'root' })
export class GraphService {


    
    
    constructor(private http: HttpClient) { }


   getDateForLast7Day(name:string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<GraphModel>('/api/node/getLast7Day/'+name);
          
    }

    getDateForLastMonth(name:string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<GraphModel>('/api/node/getLastMonth/'+name );
          
    }

    getDateForLastYear(name:string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.get<GraphModel>('/api/node/getLastYear/'+name );
          
    }
}
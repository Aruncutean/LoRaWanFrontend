import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {GraphModel} from "./graph.mpdel";


@Injectable({providedIn: 'root'})
export class GraphService {

  private baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  getDateForLast7Day(name: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<GraphModel>(this.baseUrl + 'node/getLast7Day/' + name);

  }

  getDateForLastMonth(name: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<GraphModel>(this.baseUrl + 'node/getLastMonth/' + name);

  }

  getDateForLastYear(name: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<GraphModel>(this.baseUrl + 'node/getLastYear/' + name);

  }
}

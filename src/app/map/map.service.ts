import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {Subject} from "rxjs";
import {Station} from "../map/station.model";

@Injectable({providedIn: 'root'})
export class MapService {

  node = new Subject<Station>();
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAllStation() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Station[]>(this.baseUrl + 'node/getAllNode');

  }
}

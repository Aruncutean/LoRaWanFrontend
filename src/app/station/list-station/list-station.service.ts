import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {BehaviorSubject, Subject} from "rxjs";
import {Station} from "src/app/map/station.model";
import {getLocaleDayPeriods} from "@angular/common";
import {EmailValidator} from "@angular/forms";
import {ListStation} from "./list-station.model";


interface AuthResponseDate {
  jwt: string;
  message: string;
}


@Injectable({providedIn: 'root'})
export class ListStationService {

  private auth = new BehaviorSubject<boolean>(false);
  private baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  getAllStation() {

    const userData: {
      email: string;
      password: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + userData.token,
    });


    return this.http.get<ListStation[]>(this.baseUrl + 'node/getNodeByUser/' + userData.email, {
      headers: httpHeaders,
    });
  }
}

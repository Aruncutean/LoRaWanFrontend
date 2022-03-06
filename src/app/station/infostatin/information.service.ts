import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {BehaviorSubject, Subject} from "rxjs";
import {InformationModel} from "./information.model";
import {Station} from "src/app/map/station.model";


interface AuthResponseDate {
  jwt: string;
  message: string;
}


@Injectable({providedIn: 'root'})
export class InformationService {

  private auth = new BehaviorSubject<boolean>(false);
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  getInformation(name: string, limSup: number, limInf: number) {

    const userData: {
      email: string;
      password: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + userData.token,
    });

    return this.http.get<InformationModel[]>(this.baseUrl + 'node/getPayload/' + name + '/' + limSup + '/' + limInf, {
      headers: httpHeaders,
    });
  }

  getNodePosition(name: string) {
    const userData: {
      email: string;
      password: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + userData.token,
    });

    return this.http.get<Station>(this.baseUrl + 'node/getNode/' + name, {
      headers: httpHeaders,
    });
  }


  deleteNode(name: string) {

    const userData: {
      email: string;
      password: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + userData.token,
    });

    return this.http.delete(this.baseUrl + 'node/deleteNode/' + name, {
      headers: httpHeaders,
    });
  }
}

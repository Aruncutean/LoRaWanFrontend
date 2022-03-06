import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({providedIn: 'root'})
export class AddService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  postAdd(name: string, devEui: string, appEui: string, log: string, lat: string) {
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
    return this.http.post(this.baseUrl + 'node/addNewNode', {
      userEmail: userData.email,
      name: name,
      devEui: devEui,
      appEui: appEui,
      lat: lat,
      log: log,
    }, {headers: httpHeaders,});

  }
}

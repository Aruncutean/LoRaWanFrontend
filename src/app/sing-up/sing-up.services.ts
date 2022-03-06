import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"

interface ResponseDate {
  message: string;
}

@Injectable({providedIn: 'root'})
export class SingUpService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setRol(email: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<ResponseDate>(this.baseUrl + 'setUserRol', {
      email: email,
    }, {
      headers: httpHeaders,
    });
  }

  singUp(lastName: string, firstName: string, userName: string, email: string, password: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<ResponseDate>(this.baseUrl + 'addUser', {
      lastName: lastName,
      firstName: firstName,
      userName: userName,
      email: email,
      password: password
    }, {
      headers: httpHeaders,
    });
  }
}

import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {MyAccountModel} from "./my-account.model";


@Injectable({providedIn: 'root'})
export class MyAccountService {
  private baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getUserInfo() {
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
    return this.http.get<MyAccountModel>(this.baseUrl + 'userInfo/' + userData.email, {
      headers: httpHeaders,
    });
  }
}

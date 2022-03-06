import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "./user.model";


interface AuthResponseDate {
  jwt: string;
  message: string;
}


@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<User>();
  private auth = new BehaviorSubject<boolean>(false);
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAuth(auth: boolean) {
    this.auth.next(true);
  }

  get getAuth() {
    return this.auth.asObservable();
  }

  singUp(email: string, password: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<AuthResponseDate>(this.baseUrl + 'authenticate', {
      email: email,
      password: password
    }, {
      headers: httpHeaders,
    });
  }


  reload() {
    const userData: {
      email: string;
      password: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<AuthResponseDate>(this.baseUrl + 'authenticate', {
      email: userData.email,
      password: userData.password
    }, {
      headers: httpHeaders,
    }).subscribe(restData => {

      console.log(restData)
      switch (restData.message) {
        case 'Email not exist!!!':

          break;
        case 'Password is incorrect!!!':

          break;
        case 'Ok!!':

          const user = new User(userData.email, userData.password, restData.jwt)
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          window.location.reload();
          break
      }
    })

  }
}

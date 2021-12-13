import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Subject } from "rxjs";
import { User } from "./user.model";


interface AuthResponseDate {
    jwt: string;
    message: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    user=new Subject<User>();    
   private auth=new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    setAuth(auth:boolean)
    {
        this.auth.next(true);
    }

   get getAuth(){
return this.auth.asObservable();
    }

    singUp(email: string, password: string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<AuthResponseDate>('/api/authenticate', {
            email: email,
            password: password
        }, {
            headers: httpHeaders,
        });
    }
}
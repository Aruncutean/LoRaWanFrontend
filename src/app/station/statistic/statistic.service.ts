import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http"

interface statistic {
  numberOfStation: number,
  stationActive: number,
  stationInactive: number,
  batteryLeve: number,
  humidity: number,
  temperature: number,
  airQuality: number
}

@Injectable({providedIn: 'root'})
export class StatisticService {

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

    return this.http.get<statistic>(this.baseUrl + 'node/getMyStation/' + userData.email, {
      headers: httpHeaders,
    });
  }
}

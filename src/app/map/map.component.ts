import { registerLocaleData } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { throttleTime } from 'rxjs/operators';
import { GraphService } from './graph/graph.service';
import { MapService } from './map.service';
import { Station } from './station.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements AfterViewInit {
  public chartType: string = 'line';

  public chartDatasetsHumidity: Array<any> = [{ data: [65, 50, 80, 81, 56, 55, 40] }];
  public chartDatasetsTemperature: Array<any> = [{ data: [65, 50, 80, 81, 56, 55, 40] }];
  public chartDatasetsAirQuality: Array<any> = [{ data: [65, 50, 80, 81, 56, 55, 40] }];

  public dateHumidityLast7Day: number[];
  public dateTemperatureLast7Day: number[];
  public dateAirQualityLast7Day: number[];


  public dateHumidityLastMonth: number[];
  public dateTemperatureLastMonth: number[];
  public dateAirQualityLastMonth: number[];

  public dateHumidityLastYear: number[];
  public dateTemperatureLastYear: number[];
  public dateAirQualityLastYear: number[];


  public chartLabels7Day: Array<any> = [];
  public chartLabelsLastMounth: Array<any> = [];
  public chartLabelsLastYear: Array<any> = [];


  public chartLabelsTemp: Array<any> = [];
  public chartLabelsHum: Array<any> = [];
  public chartLabelsAirQ: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(20, 0, 20, .2)',
      borderColor: 'rgba(20, 20, 20, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  open = false;
  private mapM: any;
  private marker: any;
  nameStation: string = "Nume";
  devEui: string = "Nume";
  appEui: string = "Nume";
  private initMap(): void {
    this.mapM = L.map('map', {
      center: [46.768186, 23.603996],
      zoom: 13
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.mapM);
    this.mapservice.getAllStation().subscribe(post => {
      for (let key in post) {

        this.marker = L.circleMarker([Number(post[key].lat), Number(post[key].log)]).on('click', (data) => {

          if (this.open === true) {
            this.mapservice.node.next(new Station(post[key].name, post[key].devEui, post[key].appEui, post[key].lat, post[key].log));
            this.nameStation = post[key].name;
            this.devEui = post[key].devEui;
            this.appEui = post[key].appEui;

          } else {
            this.open = true;
            this.nameStation = post[key].name;
            this.devEui = post[key].devEui;
            this.appEui = post[key].appEui;
          }
          this.readDate();



        }).addTo(this.mapM);
      }

    })




  }

  constructor(private mapservice: MapService, private grapService: GraphService) { }


  hide() {
    this.open = !this.open;
  }

  ngAfterViewInit(): void { this.initMap(); }


  readDate() {
  
    this.grapService.getDateForLastMonth(this.nameStation).subscribe(date => {
      this.dateHumidityLastMonth = date.humidity;
      this.dateTemperatureLastMonth = date.temperature;
      this.dateAirQualityLastMonth = date.airQuality
      var day = [];
      for (let i = 0; i < date.dates.length; i++) {
        day.push(date.dates[i]);
      }
      this.chartLabelsLastMounth = day;
    });
    this.grapService.getDateForLastYear(this.nameStation).subscribe(date => {
      this.dateHumidityLastYear = date.humidity;
      this.dateTemperatureLastYear = date.temperature;
      this.dateAirQualityLastYear = date.airQuality

      this.setChartYear(date.month);
      
      
    });
    this.grapService.getDateForLast7Day(this.nameStation).subscribe(date => {

      console.log(date);
      this.dateHumidityLast7Day = date.humidity;
      this.dateTemperatureLast7Day = date.temperature;
      this.dateAirQualityLast7Day = date.airQuality
      this.chartDatasetsHumidity = [{ data: this.dateHumidityLast7Day }];
      this.chartDatasetsTemperature = [{ data: this.dateTemperatureLast7Day }];
      this.chartDatasetsAirQuality = [{ data: this.dateAirQualityLast7Day }]

      var day = [];
      for (let i = 0; i < date.dates.length; i++) {
        day.push(date.dates[i]);
      }
      this.chartLabels7Day = day;
      this.chartDatasetsTemperature = [{ data: this.dateTemperatureLast7Day }];
      this.chartDatasetsHumidity = [{ data: this.dateHumidityLast7Day }];
      this.chartDatasetsAirQuality = [{ data: this.dateAirQualityLast7Day }]
      this.chartLabelsTemp=this.chartLabels7Day;
      this.chartLabelsHum=this.chartLabels7Day;
      this.chartLabelsAirQ=this.chartLabels7Day;
    });
    
  }

  setChartYear(month: number[]) {
    var monthList = [];
    for (let i = 0; i < month.length; i++) {
      console.log(month[i])
      if (month[i] == 1) {
        monthList.push('Jan');
      }
      if (month[i] == 2) {
        monthList.push('Feb');
      }
      if (month[i] == 3) {
        monthList.push('Mar');
      }
      if (month[i] == 4) {
        monthList.push('Apr');
      }
      if (month[i] == 5) {
        monthList.push('May');
      }
      if (month[i] == 6) {
        monthList.push('Jun');
      } if (month[i] == 7) {
        monthList.push('Jul');
      }
      if (month[i] == 8) {
        monthList.push('Aug');
      }
      if (month[i] == 9) {
        monthList.push('Sep');
      }
      if (month[i] == 10) {
        monthList.push('Oct');
      }
      if (month[i] ===11) {
        monthList.push('Nov');
      }
      if (month[i] === 12) {
        monthList.push('Dec');
      }
    }
   this.chartLabelsLastYear=monthList;
  }

  changeDate7Day(n: any) {
    if (n == 1) {

      this.chartDatasetsTemperature = [{ data: this.dateTemperatureLast7Day }];
      this.chartLabelsTemp=this.chartLabels7Day;
    } else if (n == 2) {
      this.chartDatasetsHumidity = [{ data: this.dateHumidityLast7Day }];
      this.chartLabelsHum=this.chartLabels7Day;
    } else if (n == 3) {
      this.chartDatasetsAirQuality = [{ data: this.dateAirQualityLast7Day }]
      this.chartLabelsAirQ=this.chartLabels7Day;
    }

  }
  changeDateMonth(n: any) {
    if (n == 1) {

      this.chartDatasetsTemperature = [{ data: this.dateTemperatureLastMonth }];
      this.chartLabelsTemp=this.chartLabelsLastMounth;
    } else if (n == 2) {

      this.chartDatasetsHumidity = [{ data: this.dateHumidityLastMonth }];
      this.chartLabelsHum=this.chartLabelsLastMounth;
    } else if (n == 3) {
      this.chartDatasetsAirQuality = [{ data: this.dateAirQualityLastMonth }];
      this.chartLabelsAirQ=this.chartLabelsLastMounth;
    }
  }
  changeDateYear(n: any) {
    if (n == 1) {

      this.chartDatasetsTemperature = [{ data: this.dateTemperatureLastYear }];
      this.chartLabelsTemp=this.chartLabelsLastYear;

    } else if (n == 2) {
      this.chartDatasetsHumidity = [{ data: this.dateHumidityLastYear }];
      this.chartLabelsHum=this.chartLabelsLastYear;

    } else if (n == 3) {
      this.chartDatasetsAirQuality = [{ data: this.dateAirQualityLastYear }]
      this.chartLabelsAirQ=this.chartLabelsLastYear;
    }
  }

}

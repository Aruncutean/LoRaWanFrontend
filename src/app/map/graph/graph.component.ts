import { registerLocaleData } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MapComponent } from '../map.component';
import { GraphService } from './graph.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',

})
export class GraphComponent implements OnInit {
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 50, 80, 81, 56, 55, 40], label: 'My First dataset' },

  ];

  public chartLabels7Day: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartLabelsLastMounth: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartLabelsLastYear: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8];
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

  constructor(private graphService: GraphService, private mapComponetn: MapComponent) {

  }

  ngOnInit(): void {


    console.log(this.mapComponetn.nameStation);

  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }





}

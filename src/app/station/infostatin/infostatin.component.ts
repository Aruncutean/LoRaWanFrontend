import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogInfoData } from '../list-station/list-station.component';
import { InformationService } from './information.service';
import { InformationModel } from './information.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-infostatin',
  templateUrl: './infostatin.component.html',
  styleUrls: ['./infostatin.component.css']
})
export class InfostatinComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['poz', 'humidity', 'temperature', 'airQuality', 'date'];
  informationList: Array<InformationModel> = [];
  dataSource = new MatTableDataSource(this.informationList);

  private mapM: any;
  private marker: any;
  private lim = 30;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<InfostatinComponent>,
    private informationService: InformationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfoData,
    private router: Router,
    private auth: AuthService) {
  }
  ngOnInit(): void {
    this.informationService.getNodePosition(this.data.name).subscribe(resDate => {
      this.marker = L.circleMarker([Number(resDate.lat), Number(resDate.log)]).addTo(this.mapM);
    })

    this.informationService.getInformation(this.data.name, this.lim, 0).subscribe(restData => {
      var informationList: Array<InformationModel> = [];

      for (let key in restData) {
        informationList.push(new InformationModel(Number(key), restData[key].airQuality,
          restData[key].temperature, restData[key].humidity, restData[key].date))
      }
      this.informationList = informationList;
      this.dataSource = new MatTableDataSource(informationList);
      this.dataSource.paginator = this.paginator;
    })

  }

  ngAfterViewInit() {
    this.initMap();

  }

  deleteNode() {
    this.informationService.deleteNode(this.data.name).subscribe(restData => {
      console.log(restData);
      this.dialogRef.close();
    }, error => {
      if (error.status === 403) {
        this.auth.reload();
      }
    })

  }


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

  }

  onPaginateChange(event: any) {
    console.log(event);

    if ((event.pageIndex * event.pageSize) == (this.lim - 5)) {

      this.informationService.getInformation(this.data.name,  30,this.lim).subscribe(restData => {
        var informationList: Array<InformationModel> = [];

        for (let key in this.informationList) {

          informationList.push(new InformationModel(Number(key), this.informationList[key].airQuality,
            this.informationList[key].temperature, this.informationList[key].humidity, this.informationList[key].date))
        }
        for (let key in restData) {
          informationList.push(new InformationModel(Number(key), restData[key].airQuality,
            restData[key].temperature, restData[key].humidity, restData[key].date))
        }
        console.log(restData);
        this.informationList = informationList;
        this.dataSource = new MatTableDataSource(informationList);
        this.dataSource.paginator = this.paginator;
        this.lim = this.lim + 30;
        console.log(this.lim);
      })
    }
    console.log('lim: ' + this.lim);
    console.log(event.length - event.pageIndex * event.pageSize)
  }

}
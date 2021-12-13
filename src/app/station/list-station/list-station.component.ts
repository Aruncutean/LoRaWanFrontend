import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';
import { AlertBoxComponent } from 'src/app/alert-box/alert-box.component';
import { AddNewStationComponent } from '../add-new-station/add-new-station.component';
import { InfostatinComponent } from '../infostatin/infostatin.component';
import { Station } from '../station.model';
import { ListStation } from './list-station.model';
import { ListStationService } from './list-station.service';

export interface DialogInfoData {
  name: string,
  devEui: string,
  appEui: string,
  battery: string,

}


@Component({
  selector: 'app-list-station',
  templateUrl: './list-station.component.html',
  styleUrls: ['./list-station.component.css']
})
export class ListStationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['poz', 'name', 'devEui', 'appEui', 'battery', 'active'];
  stationList: Array<ListStation> = [];
  dataSource = new MatTableDataSource(this.stationList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private liststation: ListStationService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.liststation.getAllStation('ion@ion.com').subscribe(restData => {
      var stationList: Array<ListStation> = [];
      for (let key in restData) {
        stationList.push(new ListStation(Number(key), restData[key].name,
          restData[key].devEui,
          restData[key].appEui,
          restData[key].battery,
          restData[key].active
        ))
      }

      this.dataSource = new MatTableDataSource(stationList);
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit(): void {

  }


  pushRow(e: any) {

    console.log(e);
    const dialogRef = this.dialog.open(InfostatinComponent, {
      width: '750px',
      data: { name: e.name, devEui: e.devEui, appEui: e.appEui, battery: e.battery }
    });
    dialogRef.afterClosed().subscribe(e => {
      this.liststation.getAllStation('ion@ion.com').subscribe(restData => {
        var stationList: Array<ListStation> = [];
        for (let key in restData) {
          stationList.push(new ListStation(Number(key), restData[key].name,
            restData[key].devEui,
            restData[key].appEui,
            restData[key].battery,
            restData[key].active
          ))
        }
  
        this.dataSource = new MatTableDataSource(stationList);
        this.dataSource.paginator = this.paginator;
      })
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  addNewStation() {
    const dialogRef = this.dialog.open(AddNewStationComponent, {
      width: '750px',

    });

    dialogRef.afterClosed().subscribe(e => {
      this.liststation.getAllStation('ion@ion.com').subscribe(restData => {
        var stationList: Array<ListStation> = [];
        for (let key in restData) {
          stationList.push(new ListStation(Number(key), restData[key].name,
            restData[key].devEui,
            restData[key].appEui,
            restData[key].battery,
            restData[key].active
          ))
        }
  
        this.dataSource = new MatTableDataSource(stationList);
        this.dataSource.paginator = this.paginator;
      })
    })

  }

}

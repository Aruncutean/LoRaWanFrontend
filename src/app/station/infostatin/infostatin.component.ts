import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DialogInfoData } from '../list-station/list-station.component';
import { InformationService } from './information.service';
import { InformationModel } from './information.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infostatin',
  templateUrl: './infostatin.component.html',
  styleUrls: ['./infostatin.component.css']
})
export class InfostatinComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['poz', 'humidity', 'temperature', 'airQuality', 'date'];
  informationList: Array<InformationModel> = [];
  dataSource = new MatTableDataSource(this.informationList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<InfostatinComponent>,
    private informationService: InformationService, 
    @Inject(MAT_DIALOG_DATA) public data: DialogInfoData,
    private router: Router) {
  }
  ngOnInit(): void {
    this.informationService.getInformation(this.data.name).subscribe(restData => {
      var informationList: Array<InformationModel> = [];

      for (let key in restData) {
        informationList.push(new InformationModel(Number(key), restData[key].airQuality,
          restData[key].temperature, restData[key].humidity, restData[key].date))
      }

      this.dataSource = new MatTableDataSource(informationList);
      this.dataSource.paginator = this.paginator;
    })

  }

  ngAfterViewInit() {

  
  }

  deleteNode() {
    this.informationService.deleteNode(this.data.name).subscribe(restData => {
      console.log(restData);
  
        
      this.dialogRef.close();
    })

  }

}



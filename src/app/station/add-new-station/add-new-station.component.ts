import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MapService } from 'src/app/map/map.service';
import * as L from 'leaflet';
import { AddService } from './add.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-station',
  templateUrl: './add-new-station.component.html',
  styleUrls: ['./add-new-station.component.css']
})
export class AddNewStationComponent implements OnInit, AfterViewInit {
  private mapM: any;
  private marker: any;

  lat: String = '';
  long: String = '';

  notMarker = true;
  errorActive: boolean = true;
  error: string = '';

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddNewStationComponent>, 
    private _formBuilder: FormBuilder,
     private addservice: AddService, 
     private router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nameStation: ['', Validators.required],
      devEui: ['', Validators.required],
      appEui: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  private initMap(): void {
    this.mapM = L.map('map', {
      center: [46.768186, 23.603996],
      zoom: 13
    });
    this.marker = L.circleMarker([Number(this.lat), Number(this.long)]).addTo(this.mapM);
    this.mapM.on('click', (e: any) => {
      this.notMarker = false;
      this.lat = e.latlng.lat;
      this.long = e.latlng.lng;
      this.marker.setLatLng(e.latlng);

    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.mapM);

  }

  ngAfterViewInit(): void { this.initMap(); }


  saveNode() {
    this.firstFormGroup.controls['nameStation'].value;
    this.addservice.postAdd(this.firstFormGroup.controls['nameStation'].value, this.firstFormGroup.controls['devEui'].value, this.firstFormGroup.controls['appEui'].value, this.long.toString(), this.lat.toString()
    ).subscribe(data => {
           console.log(data);

           this.dialogRef.close();
    });

  
  }
   
  closeDialog()
  {
this.dialogRef.close();
  }
}
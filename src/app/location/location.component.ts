import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as L from 'leaflet';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { LocationService } from './location.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
  private map: any;
  private marker: any;
  private marker1: any;

  open = false;
  addNewLocation = false;

  errorView: boolean = false;
  error: string = '';

  selectNodeValue: any;
  selectMessageValue: any;
  listNode: String[];
  listMessage: String[];
  nodeIsSelected: boolean = true;
  messageIsSelected: boolean = true;

  private lat: string = "";
  private log: string = "";

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.768186, 23.603996],
      zoom: 13
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.locationService.getLocation().subscribe(result => {

      for (let i in result) {
        this.marker = L.circleMarker([Number(result[i].log), Number(result[i].lat)]).addTo(this.map);
        this.marker.bindPopup("Name Station: " + result[i].name + "<br>" + "Rssi: " + result[i].rssi);
      }
    },error=>{
         if(error.status===403)
         {
           this.auth.reload();
          
         }
    })



    this.marker1 = L.circleMarker([46.768186, 23.603996]).addTo(this.map);
    this.map.removeLayer(this.marker1);
    this.map.on('click', (e: any) => {

      if (this.addNewLocation == true) {
        this.lat = e.latlng.lat;
        this.log = e.latlng.lng;
        this.marker1.setLatLng(e.latlng);
        this.map.addLayer(this.marker1);
      }
    });
  }


  constructor(public locationService: LocationService,private auth:AuthService) { }

  hide() {
    this.open = !this.open;

    if (this.map.hasLayer(this.marker1) && this.addNewLocation == true) {
      this.map.removeLayer(this.marker1);
    }
    this.addNewLocation = !this.addNewLocation;
  }
  ngAfterViewInit(): void {

    this.locationService.getNodeName().subscribe(date => {
      this.listNode = date;
    });
    this.initMap();
  }

  onSubmit(form: NgForm) {

    if (this.log === "" || this.lat === "") {
      this.errorView = true;
      this.error = "Select location"
      console.log("log and lat is null");
    } else {
      this.errorView = false;
      if (this.nodeIsSelected == false) {
        this.errorView = false;
        if (this.messageIsSelected == false) {
          this.locationService.postLocation(this.selectNodeValue, this.selectMessageValue, this.lat, this.log).subscribe(resul => {

            console.log(resul);
            if (resul.message === "Nu exista nod!!!") {
              this.errorView = true;
              this.error = "Nodul este incorect"
            } else {
              window.location.reload();
            }
          });
        } else {
          this.errorView = true;
          this.error = "Select Message"
          console.log("log and lat is null");
        }
      } else {
        this.errorView = true;
        this.error = "Select Node"
        console.log("log and lat is null");
      }


    }


  }

  selectNode(event: any) {

    this.locationService.getMessage(event.target.value).subscribe(date => {
      this.listMessage = date;
      this.nodeIsSelected = false;
    },error=>{
      if(error.status===403)
      {
        this.auth.reload();
      
      }
 })
    this.selectNodeValue = event.target.value;

    this.errorView = false;
  }

  selectMessage(event: any) {

    var ar = event.target.value.split(':');
    this.selectMessageValue = ar[ar.length - 1];
    console.log(ar[ar.length - 1]);
    this.messageIsSelected = false;
    this.errorView = false;
  }

}

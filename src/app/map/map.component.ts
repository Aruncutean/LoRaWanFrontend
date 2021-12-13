import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit {
  
  open=false;
  latitude= 46.570358;
  longitude=23.785419;
  constructor() { }


hide()
{
  this.open=!this.open;
}

  ngOnInit(): void {
  }

}

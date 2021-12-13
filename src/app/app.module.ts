import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { SingUpComponent } from './sing-up/sing-up.component';
import { StationComponent } from './station/station.component';
import { StatisticComponent } from './station/statistic/statistic.component';
import { ListStationComponent } from './station/list-station/list-station.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'SingUp', component: SingUpComponent },
  { path: 'Station', component: StationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MapComponent,
    SingUpComponent,
    StationComponent,
    StatisticComponent,
    ListStationComponent,

  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB6k_xAqPqKRzu9pFskJcZJDpQAVmQ9s3w'
    }),
    BrowserModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

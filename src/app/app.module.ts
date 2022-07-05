import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SingUpComponent } from './sing-up/sing-up.component';
import { StationComponent } from './station/station.component';
import { StatisticComponent } from './station/statistic/statistic.component';
import { ListStationComponent } from './station/list-station/list-station.component';
import { LocationComponent } from './location/location.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GraphComponent } from './map/graph/graph.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InfostatinComponent } from './station/infostatin/infostatin.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewStationComponent } from './station/add-new-station/add-new-station.component';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'Auth', component: AuthComponent },
  { path: 'SingUp', component: SingUpComponent },
  { path: 'Station', component: StationComponent },
  { path: 'Location', component: LocationComponent },
  { path: 'MyAccount', component: MyAccountComponent }
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    SingUpComponent,
    StationComponent,
    StatisticComponent,
    ListStationComponent,
    LocationComponent,
    AuthComponent,
    GraphComponent,
    MyAccountComponent,
    InfostatinComponent,
    AddNewStationComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6k_xAqPqKRzu9pFskJcZJDpQAVmQ9s3w'
    }),
    BrowserModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    NgbModule,
    HttpClientModule,
    MDBBootstrapModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return "https://licenta-db.herokuapp.com/";
}

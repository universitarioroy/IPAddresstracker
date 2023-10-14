import { Component,OnInit,AfterViewInit   } from '@angular/core';
import { ApiService } from './api.service';
import * as L from 'leaflet';

// npm i --save-dev @types/leaflet;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{

  title="";
  inputIP:string='';

  ipAddress:string='192.212.174.101';
  location:string="Broolklyn,NY\n 10001";

  timeZone:string='UTC-05:00';
  isp:string='SpaceX\nStarlink';

  latLong:string[]=[];

  private apiService:ApiService;

  constructor(apiService:ApiService) {
     this.apiService=apiService;
  }



  async onSubmit(event:Event){

    event.preventDefault();

    const datos_1 =await this.apiService.getDatos_1(this.inputIP);
    const datos_2=await this.apiService.getDatos_2(this.inputIP);

    this.ipAddress=datos_2.data.ip;
    this.location=datos_2.data.location.region;
    this.timeZone=datos_2.data.location.timezone;
    this.isp=datos_2.data.isp;
    this.latLong=datos_1.data.loc.split(',');
    console.log(datos_1.data.loc);
    console.log(datos_1.data.loc.split(','));

  }


  ngAfterViewInit() {
    const map = L.map('map').setView([-12.0432,-77.0282], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Puedes agregar marcadores, polígonos, etc. aquí
    const marker = L.marker([-12.0432,-77.0282]).addTo(map);
    var circle = L.circle([-12.0432,-77.0282], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);

    var polygon = L.polygon([
      [-12.0432,-77.0282],
      [-12.0432,-77.0282],
      [-12.0432,-77.0282]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");


  }
}

import { Component,OnInit,AfterViewInit   } from '@angular/core';
import { ApiService } from './api.service';
import * as L from 'leaflet';

// npm i --save-dev @types/leaflet;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

  title="";
  inputIP:string='';

  ipAddress:string='192.212.174.101';
  location:string="Broolklyn,NY\n 10001";

  timeZone:string='UTC-05:00';
  isp:string='SpaceX\nStarlink';

  lat:number=43.732388;
  long:number=7.417945;

  map:any='';
  customIcon:any='';
  marker:any='';
  circle:any='';
  polygon:any='';


  private apiService:ApiService;

  constructor(apiService:ApiService) {
     this.apiService=apiService;
  }

  async onSubmit(event:Event){
    event.preventDefault();
    await this.showLocalization();
    await this.setMaps();
  }

  async initMaps() {
    return new Promise<void>((resolve, reject) => {
      this.map = L.map('map').setView([this.lat,this.long], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      // Puedes agregar marcadores, polígonos, etc. aquí
      this.customIcon = L.icon({
        iconUrl: '../assets/images/icon-location.svg',
        iconSize: [40, 50], // Tamaño del ícono
        iconAnchor: [20, 50], // Punto de anclaje del ícono (en este caso, el centro del ícono)
        popupAnchor: [0, -32] // Punto de anclaje del popup (en este caso, encima del ícono)
      });

      this.map.zoomControl.remove();
      this.marker = L.marker([this.lat,this.long],{icon:this.customIcon}).addTo(this.map);

      this.circle = L.circle([this.lat,this.long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50
      }).addTo(this.map);

      //this.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      //this.circle.bindPopup("I am a circle.");
      resolve();
    })
  }

  async setMaps(){
    // Aqui deberia llamar al maps para renderizarlo pero pense que seria automaticos
    return new Promise<void>((resolve, reject) => {
      this.map.setView([this.lat, this.long], this.map.getZoom());
      this.marker.setLatLng(L.latLng(this.lat, this.long));
      this.circle.setLatLng(L.latLng(this.lat, this.long));
      this.inputIP='';
    })
  }

  async getIP(){
    const datos_3=await this.apiService.getIublica();
    this.inputIP=datos_3.data;
  }

  async showLocalization(){
    const datos_1 =await this.apiService.getDatos_1(this.inputIP);
    const datos_2=await this.apiService.getDatos_2(this.inputIP);

    this.ipAddress=datos_2.data.ip;
    this.location=datos_2.data.location.region;
    this.timeZone=datos_2.data.location.timezone;
    this.isp=datos_2.data.isp;
    this.lat=parseFloat(datos_1.data.loc.split(',')[0]);
    this.long=parseFloat(datos_1.data.loc.split(',')[1]);
  }

  async ngAfterViewInit(){
    await this.getIP();
    await this.showLocalization();
    await this.initMaps();
  }
}

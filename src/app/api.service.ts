import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment } from '../environments/environment';



@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = 'https://ipinfo.io/';
  private key_1="b97e891aec34e1";
  private key_2="at_mdqQcQ4gW8HGyg7w2NDVT3FeWYjsR";

  constructor() {

  }

  async getDatos_1(inputIP:string) {
    return axios.get(`${this.apiUrl}${inputIP}?token=${environment.key_1}`);
  }

  async getDatos_2(inputIP:string) {
    return axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${environment.key_2}&ipAddress=${inputIP}`);
  }

  async getIublica(){
    return axios.get('https://api.ipify.org');
  }
}

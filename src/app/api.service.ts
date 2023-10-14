import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root',
})

export class ApiService {
  //private apiUrl = 'https://geo.ipify.org/api/v2/country?apiKey=at_mdqQcQ4gW8HGyg7w2NDVT3FeWYjsR&ipAddress';
  private apiUrl = 'https://ipinfo.io/';
  private key="token=b97e891aec34e1";

  constructor() {}
  //38.25.18.138
  async getDatos_1(inputIP:string) {
    console.log(`${this.apiUrl}${inputIP}?${this.key}`);
    return axios.get(`${this.apiUrl}${inputIP}?${this.key}`);
  }

  async getDatos_2(inputIP:string) {
    console.log(`https://geo.ipify.org/api/v2/country?apiKey=at_mdqQcQ4gW8HGyg7w2NDVT3FeWYjsR&${inputIP}`);
    return axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_mdqQcQ4gW8HGyg7w2NDVT3FeWYjsR&ipAddress=${inputIP}`);
  }
}

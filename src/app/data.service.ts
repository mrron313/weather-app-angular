import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  proxy = 'https://cors-anywhere.herokuapp.com/';
  private REST_API_SERVER = this.proxy + "https://api.darksky.net/forecast/1d9556d6be702905470df1230d9d4f12/23.777176,90.399452";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
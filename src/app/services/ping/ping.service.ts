import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  private path = environment.apiUrl + '/' + 'ping'

  constructor(private http: HttpClient) { }


  getPing(){
    return this.http.get(this.path);
  }

}

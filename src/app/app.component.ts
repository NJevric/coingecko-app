import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PingService } from './services/ping/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'coingecko-api';
  tag:string = '';
  constructor(private pingService: PingService){}

  ngOnInit(): void {
    console.log('a');
    console.log(environment.apiUrl);
    this.getData();

  }

  public getData(){
    this.pingService.getPing().subscribe((response:any)=>{
      console.log(response);
      this.tag = response.gecko_says;
      console.log(this.tag);12
    })
  }
}

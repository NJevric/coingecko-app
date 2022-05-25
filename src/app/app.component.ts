import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { PingService } from './services/ping/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private pingService: PingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }


}

import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { environment as env } from 'src/environments/environment.prod';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUrl: string = '';
  constructor(
    public httpServ: HttpService,
    public _router: Router,
    public location: PlatformLocation
  ) {
    this.httpServ.getData<any>('assets/environment.json').subscribe((res) => {
      environment.apiUrl = res.apiUrl;
      env.apiUrl = res.apiUrl;
    });
  }
}

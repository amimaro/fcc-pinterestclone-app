import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  user: any;
  message: string = "";
  apiUrl: string = 'http://localhost:8080/api/';
  isLoggedIn: boolean = false;
  wonders: any = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getIsLoggedIn();
    this.getAllWonders();
  }

  routeTo(route) {
    this.router.navigate(route);
  }

  getUser() { return this.user; }

  getSession() {
    return this.http.get(this.apiUrl + 'user/auth/session');
  }

  getIsLoggedIn() {
    this.getSession()
      .subscribe(
      res => {
        this.isLoggedIn = true;
        console.log(this.isLoggedIn)
      },
      err => {
        this.isLoggedIn = false;
        console.log(this.isLoggedIn)
      });
  }

  login() {
    window.location.href = '/api/user/auth/twitter/login';
  }

  logout() {
    window.location.href = '/api/user/auth/logout';
  }

  save(form) {
    this.http.post(this.apiUrl + 'wonder', form)
    .subscribe(
      res => {
        alert('Wonder Saved!');
      },
      err => {
        console.error(err);
        if(err.status == 401)
          alert('Unauthorized');
      }
    )
  }

  getAllWonders() {
    this.http.get(this.apiUrl + 'wonder')
    .subscribe(
      res => {
        this.wonders = res;
      },
      err => {
        console.error(err);
      }
    )
  }

}

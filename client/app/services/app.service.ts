import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  user: any = {};
  message: string = "";
  apiUrl: string = 'http://localhost:8080/api/';
  isLoggedIn: boolean = false;
  wonders: any = [];
  mywonders: any = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getIsLoggedIn();
    this.getAllWonders();
    this.getWondersByUser();
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
        this.user = res;
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
        this.getAllWonders();
        this.getWondersByUser();
      },
      err => {
        console.error(err);
        if (err.status == 401)
          alert('Unauthorized');
      }
      )
  }

  getAllWonders() {
    this.http.get(this.apiUrl + 'wonder')
      .subscribe(
      res => {
        console.log(res);
        this.wonders = res;
      },
      err => {
        console.error(err);
      }
      )
  }

  getWondersByUser() {
    this.http.get(this.apiUrl + 'wonder/user')
      .subscribe(
      res => {
        console.log(res);
        this.mywonders = res;
      },
      err => {
        console.error(err);
      }
      )
  }

  deleteWonder(wonder) {
    this.http.delete(this.apiUrl + 'wonder/' + wonder._id)
      .subscribe(
      res => {
        alert('Wonder Deleted!')
        this.getAllWonders();
        this.getWondersByUser();
      },
      err => {
        console.error(err);
      }
      )
  }

}

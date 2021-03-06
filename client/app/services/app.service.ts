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
    if (form.tags.length > 0)
      form.tags = form.tags.map((tag) => {
        return tag.value;
      })
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
        if (Object.values(res).length != this.wonders.length)
          this.wonders = res;
        else {
          Object.values(res).map((wonder, index) => {
            this.wonders[index]['likes'] = wonder['likes'];
          });
        }
      },
      err => {
        console.error(err);
      }
      )
    this.getIsLoggedIn();
  }

  getWondersByUser() {
    this.http.get(this.apiUrl + 'wonder/user')
      .subscribe(
      res => {
        console.log(res);
        if (Object.values(res).length != this.mywonders.length)
          this.mywonders = res;
        else {
          Object.values(res).map((wonder, index) => {
            this.mywonders[index]['likes'] = wonder['likes'];
          });
        }
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

  likeWonder(wonder) {
    this.http.put(this.apiUrl + 'user/likewonder/' + wonder._id, wonder)
      .subscribe(
      res => {
        this.http.put(this.apiUrl + 'wonder/like/' + wonder._id, wonder)
          .subscribe(
          res => {
            this.getAllWonders();
            this.getWondersByUser();
          },
          err => {
            if (err.status == 401)
              alert('Please, login first...');
            console.error(err);
          }
          )
      },
      err => {
        if (err.status == 401)
          alert('Please, login first...');
        console.error(err);
      }
      )
  }

  unLikeWonder(wonder) {
    this.http.put(this.apiUrl + 'user/unlikewonder/' + wonder._id, wonder)
      .subscribe(
      res => {
        this.http.put(this.apiUrl + 'wonder/unlike/' + wonder._id, wonder)
          .subscribe(
          res => {
            this.getAllWonders();
            this.getWondersByUser();
          },
          err => {
            if (err.status == 401)
              alert('Please, login first...');
            console.error(err);
          }
          )
      },
      err => {
        if (err.status == 401)
          alert('Please, login first...');
        console.error(err);
      }
      )
  }

  iLiked(wonder) {
    if (this.user.hasOwnProperty('likedWonders'))
      for (let liked of this.user.likedWonders) {
        if (liked == wonder._id) {
          return true;
        }
      }
    return false;
  }

  searchTag(tag) {
    this.http.get(this.apiUrl + 'wonder/tag/' + tag)
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

  searchMyTag(tag) {
    this.http.get(this.apiUrl + 'wonder/user/tag/' + tag)
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

}

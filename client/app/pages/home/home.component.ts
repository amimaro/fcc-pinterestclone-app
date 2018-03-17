import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

  updateUrl(ev) {
    ev.target.src = 'https://bulma.io/images/placeholders/128x128.png';
  }

  delete(wonder) {
    this.appService.deleteWonder(wonder);
  }

  like(wonder, ev) {
    if (ev.target.parentElement.className.indexOf('has-text-danger') < 0) {
      this.appService.likeWonder(wonder);
      ev.target.parentElement.classList.add('has-text-danger');
    }
    else {
      this.appService.unLikeWonder(wonder);
      ev.target.parentElement.classList.remove('has-text-danger');
    }
  }

  iLiked(wonder) {
    return this.appService.iLiked(wonder);
  }

  searchTag(tag) {
    this.appService.searchTag(tag);
  }

}

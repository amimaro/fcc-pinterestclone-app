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

  like(wonder) {
    this.appService.likeWonder(wonder);
  }

  iLiked(wonder) {
    return this.appService.iLiked(wonder);
  }

}

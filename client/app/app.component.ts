import { Component } from '@angular/core';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isNavBar: boolean = false;

  constructor(public appService: AppService) {
    this.changeBackground();
  }

  toggleNavBar() {
    return this.isNavBar;
  }

  changeBackground() {
    let images = [
      'assets/background/milky-way-2695569_1920.jpg',
      'assets/background/desert-1654439_1920.jpg',
      'assets/background/desert-2340326_1920.jpg',
      'assets/background/polynesia-3021072_1920.jpg'
    ];
    document.body.style.background = `url(${images[Math.floor(Math.random() * 4)]})`;
    setInterval(() => {
      document.body.style.background = `url(${images[Math.floor(Math.random() * 4)]})`;
    }, 60000);
  }

}

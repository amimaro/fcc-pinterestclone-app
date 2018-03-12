import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wonders',
  templateUrl: './my-wonders.component.html',
  styleUrls: ['./my-wonders.component.css']
})
export class MyWondersComponent implements OnInit {

  isModalActive: boolean = true;
  form: any = {
    title: '',
    link: ''
  };
  imgSrc: string = 'https://bulma.io/images/placeholders/128x128.png';

  constructor() {

  }

  ngOnInit() {
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
    if(this.isModalActive == false){
      this.form = {
        title: '',
        link: '',
      }
    }
  }

  updateUrl(e) {
    this.imgSrc = 'https://bulma.io/images/placeholders/128x128.png';
  }

  updateImage() {
    this.imgSrc = this.form.link;
  }

}

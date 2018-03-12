import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-my-wonders',
  templateUrl: './my-wonders.component.html',
  styleUrls: ['./my-wonders.component.css']
})
export class MyWondersComponent implements OnInit {

  isModalActive: boolean = true;
  form: any = {
    title: '',
    link: '',
    hashtags: '',
  };
  imgSrc: string = 'https://bulma.io/images/placeholders/128x128.png';

  constructor(public appService: AppService) {
    // this.appService.getSession().subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log("Error occured");
    //     console.log(err);
    //     this.appService.routeTo(['/'])
    //   });
  }

  ngOnInit() {
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
    if (this.isModalActive == false) {
      this.form = {
        title: '',
        link: '',
        hashtags: ''
      }
    }
  }

  updateUrl(e) {
    this.imgSrc = 'https://bulma.io/images/placeholders/128x128.png';
  }

  updateImage() {
    this.imgSrc = this.form.link;
  }

  updateHashtag() {
    
  }

  save() {
    this.appService.save(this.form);
  }

}

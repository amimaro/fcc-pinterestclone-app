import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-my-wonders',
  templateUrl: './my-wonders.component.html',
  styleUrls: ['./my-wonders.component.css']
})
export class MyWondersComponent implements OnInit {

  isModalActive: boolean = false;
  form: any = {
    title: '',
    link: '',
    tags: '',
  };
  imgSrc: string = 'https://bulma.io/images/placeholders/128x128.png';

  constructor(public appService: AppService) {
    this.appService.getSession().subscribe(
      res => {
        console.log(res);
        this.appService.getWondersByUser();
      },
      err => {
        console.log("Error occured");
        console.log(err);
        this.appService.routeTo(['/'])
      });
  }

  ngOnInit() {
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
    if (this.isModalActive == false) {
      this.form = {
        title: '',
        link: '',
        tags: ''
      }
    }
  }

  updateUrl(ev) {
    ev.target.src = 'https://bulma.io/images/placeholders/128x128.png';
  }

  updateImage() {
    this.imgSrc = this.form.link;
  }

  updateTags(ev) {
    if(ev.key == ' ') {

    }
  }

  save() {
    this.appService.save(this.form);
    this.toggleModal();
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
    this.appService.searchMyTag(tag);
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWondersComponent } from './my-wonders.component';

describe('MyWondersComponent', () => {
  let component: MyWondersComponent;
  let fixture: ComponentFixture<MyWondersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWondersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWondersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

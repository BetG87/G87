import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalinfoaccountGameComponent } from './my-modalinfoaccount-game.component';

describe('MyModalinfoaccountGameComponent', () => {
  let component: MyModalinfoaccountGameComponent;
  let fixture: ComponentFixture<MyModalinfoaccountGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalinfoaccountGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalinfoaccountGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalinfoaccountComponent } from './my-modalinfoaccount.component';

describe('MyModalinfoaccountComponent', () => {
  let component: MyModalinfoaccountComponent;
  let fixture: ComponentFixture<MyModalinfoaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalinfoaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalinfoaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

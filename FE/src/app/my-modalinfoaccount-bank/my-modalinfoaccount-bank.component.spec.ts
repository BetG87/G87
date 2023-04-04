import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalinfoaccountBankComponent } from './my-modalinfoaccount-bank.component';

describe('MyModalinfoaccountBankComponent', () => {
  let component: MyModalinfoaccountBankComponent;
  let fixture: ComponentFixture<MyModalinfoaccountBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalinfoaccountBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalinfoaccountBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

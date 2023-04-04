import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateaccountBankComponent } from './my-modalupdateaccount-bank.component';

describe('MyModalupdateaccountBankComponent', () => {
  let component: MyModalupdateaccountBankComponent;
  let fixture: ComponentFixture<MyModalupdateaccountBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateaccountBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateaccountBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateaccountBankuserComponent } from './my-modalupdateaccount-bankuser.component';

describe('MyModalupdateaccountBankuserComponent', () => {
  let component: MyModalupdateaccountBankuserComponent;
  let fixture: ComponentFixture<MyModalupdateaccountBankuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateaccountBankuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateaccountBankuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

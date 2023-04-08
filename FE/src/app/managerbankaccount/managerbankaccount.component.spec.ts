import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerbankaccountComponent } from './managerbankaccount.component';

describe('ManagerbankaccountComponent', () => {
  let component: ManagerbankaccountComponent;
  let fixture: ComponentFixture<ManagerbankaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerbankaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerbankaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

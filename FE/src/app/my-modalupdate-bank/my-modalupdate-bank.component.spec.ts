import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateBankComponent } from './my-modalupdate-bank.component';

describe('MyModalupdateBankComponent', () => {
  let component: MyModalupdateBankComponent;
  let fixture: ComponentFixture<MyModalupdateBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

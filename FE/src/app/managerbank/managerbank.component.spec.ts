import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerbankComponent } from './managerbank.component';

describe('ManagerbankComponent', () => {
  let component: ManagerbankComponent;
  let fixture: ComponentFixture<ManagerbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerbankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

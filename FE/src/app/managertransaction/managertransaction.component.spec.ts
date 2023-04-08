import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagertransactionComponent } from './managertransaction.component';

describe('ManagertransactionComponent', () => {
  let component: ManagertransactionComponent;
  let fixture: ComponentFixture<ManagertransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagertransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagertransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

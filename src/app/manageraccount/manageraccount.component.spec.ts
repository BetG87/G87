import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageraccountComponent } from './manageraccount.component';

describe('ManageraccountComponent', () => {
  let component: ManageraccountComponent;
  let fixture: ComponentFixture<ManageraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageraccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

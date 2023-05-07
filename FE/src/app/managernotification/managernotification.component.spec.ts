import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagernotificationComponent } from './managernotification.component';

describe('ManagernotificationComponent', () => {
  let component: ManagernotificationComponent;
  let fixture: ComponentFixture<ManagernotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagernotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagernotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

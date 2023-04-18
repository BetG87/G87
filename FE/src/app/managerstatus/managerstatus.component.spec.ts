import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerstatusComponent } from './managerstatus.component';

describe('ManagerstatusComponent', () => {
  let component: ManagerstatusComponent;
  let fixture: ComponentFixture<ManagerstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

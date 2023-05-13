import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerlinkComponent } from './managerlink.component';

describe('ManagerlinkComponent', () => {
  let component: ManagerlinkComponent;
  let fixture: ComponentFixture<ManagerlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerlinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

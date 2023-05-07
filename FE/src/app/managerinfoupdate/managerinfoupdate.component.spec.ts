import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerinfoupdateComponent } from './managerinfoupdate.component';

describe('ManagerinfoupdateComponent', () => {
  let component: ManagerinfoupdateComponent;
  let fixture: ComponentFixture<ManagerinfoupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerinfoupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerinfoupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

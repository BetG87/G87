import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagergameComponent } from './managergame.component';

describe('ManagergameComponent', () => {
  let component: ManagergameComponent;
  let fixture: ComponentFixture<ManagergameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagergameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagergameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

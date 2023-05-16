import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutaccountgameComponent } from './aboutaccountgame.component';

describe('AboutaccountgameComponent', () => {
  let component: AboutaccountgameComponent;
  let fixture: ComponentFixture<AboutaccountgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutaccountgameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutaccountgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

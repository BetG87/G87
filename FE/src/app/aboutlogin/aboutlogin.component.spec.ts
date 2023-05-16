import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutloginComponent } from './aboutlogin.component';

describe('AboutloginComponent', () => {
  let component: AboutloginComponent;
  let fixture: ComponentFixture<AboutloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

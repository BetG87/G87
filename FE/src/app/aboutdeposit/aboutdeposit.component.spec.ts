import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutdepositComponent } from './aboutdeposit.component';

describe('AboutdepositComponent', () => {
  let component: AboutdepositComponent;
  let fixture: ComponentFixture<AboutdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutdepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

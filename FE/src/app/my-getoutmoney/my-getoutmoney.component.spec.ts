import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGetoutmoneyComponent } from './my-getoutmoney.component';

describe('MyGetoutmoneyComponent', () => {
  let component: MyGetoutmoneyComponent;
  let fixture: ComponentFixture<MyGetoutmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGetoutmoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGetoutmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddmoneyComponent } from './my-addmoney.component';

describe('MyAddmoneyComponent', () => {
  let component: MyAddmoneyComponent;
  let fixture: ComponentFixture<MyAddmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAddmoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAddmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddbankComponent } from './my-addbank.component';

describe('MyAddbankComponent', () => {
  let component: MyAddbankComponent;
  let fixture: ComponentFixture<MyAddbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAddbankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAddbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalconfirmationmsgComponent } from './my-modalconfirmationmsg.component';

describe('MyModalconfirmationmsgComponent', () => {
  let component: MyModalconfirmationmsgComponent;
  let fixture: ComponentFixture<MyModalconfirmationmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalconfirmationmsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalconfirmationmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

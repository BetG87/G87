import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModaldeleteComponent } from './my-modaldelete.component';

describe('MyModaldeleteComponent', () => {
  let component: MyModaldeleteComponent;
  let fixture: ComponentFixture<MyModaldeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModaldeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

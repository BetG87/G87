import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateanotificationComponent } from './my-modalupdateanotification.component';

describe('MyModalupdateanotificationComponent', () => {
  let component: MyModalupdateanotificationComponent;
  let fixture: ComponentFixture<MyModalupdateanotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateanotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateanotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

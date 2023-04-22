import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdatestatusComponent } from './my-modalupdatestatus.component';

describe('MyModalupdatestatusComponent', () => {
  let component: MyModalupdatestatusComponent;
  let fixture: ComponentFixture<MyModalupdatestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdatestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdatestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

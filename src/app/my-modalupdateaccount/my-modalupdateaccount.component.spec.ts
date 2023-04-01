import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateaccountComponent } from './my-modalupdateaccount.component';

describe('MyModalupdateaccountComponent', () => {
  let component: MyModalupdateaccountComponent;
  let fixture: ComponentFixture<MyModalupdateaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateaccountGameComponent } from './my-modalupdateaccount-game.component';

describe('MyModalupdateaccountGameComponent', () => {
  let component: MyModalupdateaccountGameComponent;
  let fixture: ComponentFixture<MyModalupdateaccountGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateaccountGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateaccountGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

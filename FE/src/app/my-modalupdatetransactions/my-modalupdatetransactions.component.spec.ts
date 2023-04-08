import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdatetransactionsComponent } from './my-modalupdatetransactions.component';

describe('MyModalupdatetransactionsComponent', () => {
  let component: MyModalupdatetransactionsComponent;
  let fixture: ComponentFixture<MyModalupdatetransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdatetransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdatetransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

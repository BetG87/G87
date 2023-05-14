import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalshowinfogameComponent } from './my-modalshowinfogame.component';

describe('MyModalshowinfogameComponent', () => {
  let component: MyModalshowinfogameComponent;
  let fixture: ComponentFixture<MyModalshowinfogameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalshowinfogameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalshowinfogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

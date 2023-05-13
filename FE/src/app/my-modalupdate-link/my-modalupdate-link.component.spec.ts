import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateLinkComponent } from './my-modalupdate-link.component';

describe('MyModalupdateLinkComponent', () => {
  let component: MyModalupdateLinkComponent;
  let fixture: ComponentFixture<MyModalupdateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

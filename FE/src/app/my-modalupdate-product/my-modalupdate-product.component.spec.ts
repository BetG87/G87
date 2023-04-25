import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModalupdateProductComponent } from './my-modalupdate-product.component';

describe('MyModalupdateProductComponent', () => {
  let component: MyModalupdateProductComponent;
  let fixture: ComponentFixture<MyModalupdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyModalupdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyModalupdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

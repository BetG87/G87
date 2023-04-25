import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagergameProductComponent } from './managergame-product.component';

describe('ManagergameProductComponent', () => {
  let component: ManagergameProductComponent;
  let fixture: ComponentFixture<ManagergameProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagergameProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagergameProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

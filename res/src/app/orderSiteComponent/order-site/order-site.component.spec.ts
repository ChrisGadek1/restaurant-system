import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSiteComponent } from './order-site.component';

describe('OrderSiteComponent', () => {
  let component: OrderSiteComponent;
  let fixture: ComponentFixture<OrderSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

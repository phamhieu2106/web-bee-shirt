import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryPaymentComponent } from './order-history-payment.component';

describe('OrderHistoryPaymentComponent', () => {
  let component: OrderHistoryPaymentComponent;
  let fixture: ComponentFixture<OrderHistoryPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryPaymentComponent]
    });
    fixture = TestBed.createComponent(OrderHistoryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

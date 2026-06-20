import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAuditLog } from './delivery-audit-log';

describe('DeliveryAuditLog', () => {
  let component: DeliveryAuditLog;
  let fixture: ComponentFixture<DeliveryAuditLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAuditLog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryAuditLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

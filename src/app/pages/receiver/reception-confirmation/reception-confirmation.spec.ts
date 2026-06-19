import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionConfirmation } from './reception-confirmation';

describe('ReceptionConfirmation', () => {
  let component: ReceptionConfirmation;
  let fixture: ComponentFixture<ReceptionConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceptionConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBrowse } from './catalog-browse';

describe('CatalogBrowse', () => {
  let component: CatalogBrowse;
  let fixture: ComponentFixture<CatalogBrowse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogBrowse],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogBrowse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

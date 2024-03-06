import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiamGiaComponent } from './giam-gia.component';

describe('GiamGiaComponent', () => {
  let component: GiamGiaComponent;
  let fixture: ComponentFixture<GiamGiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiamGiaComponent]
    });
    fixture = TestBed.createComponent(GiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

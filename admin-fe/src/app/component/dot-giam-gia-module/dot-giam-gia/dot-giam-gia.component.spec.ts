import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotGiamGiaComponent } from './dot-giam-gia.component';

describe('DotGiamGiaComponent', () => {
  let component: DotGiamGiaComponent;
  let fixture: ComponentFixture<DotGiamGiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotGiamGiaComponent]
    });
    fixture = TestBed.createComponent(DotGiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

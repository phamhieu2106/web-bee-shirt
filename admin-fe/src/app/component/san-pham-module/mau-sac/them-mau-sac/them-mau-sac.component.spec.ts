import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMauSacComponent } from './them-mau-sac.component';

describe('ThemMauSacComponent', () => {
  let component: ThemMauSacComponent;
  let fixture: ComponentFixture<ThemMauSacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMauSacComponent]
    });
    fixture = TestBed.createComponent(ThemMauSacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

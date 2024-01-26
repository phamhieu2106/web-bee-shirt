/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KhachHang.serviceService } from './khach-hang.service.service';

describe('Service: KhachHang.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KhachHang.serviceService]
    });
  });

  it('should ...', inject([KhachHang.serviceService], (service: KhachHang.serviceService) => {
    expect(service).toBeTruthy();
  }));
});

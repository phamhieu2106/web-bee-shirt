import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MauSac } from "src/app/model/class/mau-sac.class";

import { SanPham } from "src/app/model/class/san-pham.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: 'app-dot-giam-gia',
  templateUrl: './dot-giam-gia.component.html',
  styleUrls: ['./dot-giam-gia.component.css']
})
export class DotGiamGiaComponent {
  public pagedResponse: PagedResponse<SanPham>;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  intervalId: any;
  public hoursDisplay:any;
  public minutesDisplay :any;
  public secondsDisplay :any;



  constructor(
    private currencyPipe: CurrencyPipe,
    private sanPhamService: SanPhamService
  ) { }

  ngOnInit(): void {
    this.getSanPhamList();

    // Thời Gian Sale
    // Set the date we're counting down to
    const countDownDate = new Date("Jan 16, 2025 15:37:25").getTime();

    // Update the count down every 1 second
    this.intervalId = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for hours, minutes and seconds
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Add leading zero if needed
      this.hoursDisplay = this.hours < 10 ? '0' + this.hours : this.hours;
      this.minutesDisplay = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      this.secondsDisplay = this.seconds < 10 ? '0' + this.seconds : this.seconds;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.intervalId);
        this.hoursDisplay = '00';
        this.minutesDisplay = '00';
        this.secondsDisplay = '00';
      }
    }, 1000);


  }




  // public functions
  public displayPrice(sanPham: SanPham): any {
    const priceArr = [];
    for (let spct of sanPham.sanPhamChiTiets) {
      priceArr.push(spct.giaBan);
    }
    const minPrice = Math.min(...priceArr);
    const maxPrice = Math.max(...priceArr);
    if (minPrice === maxPrice) {
      return this.currencyPipe.transform(minPrice, "VND", "symbol", "1.0-0");
    }
    return (
      this.currencyPipe.transform(minPrice, "VND", "symbol", "1.0-0") +
      " - " +
      this.currencyPipe.transform(maxPrice, "VND", "symbol", "1.0-0")
    );
  }

  public getMauSacList(sanPham: SanPham): MauSac[] {
    const mauSacs: MauSac[] = [];
    for (let spct of sanPham.sanPhamChiTiets) {
      if (!this.checkExist(mauSacs, spct.mauSac.id)) {
        mauSacs.push(spct.mauSac);
      }
    }
    return mauSacs;
  }

  private checkExist(mauSacs: MauSac[], mauSacId: number): boolean {
    for (let m of mauSacs) {
      if (m.id === mauSacId) {
        return true;
      }
    }
    return false;
  }
  // private functions
  private getSanPhamList(): void {
    this.sanPhamService.getByPageClient().subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }






}

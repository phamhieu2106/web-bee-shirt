import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  constructor() { }
  ngOnInit(): void {
    // Hiển thị trang London mặc định khi trang được tải
    this.openCity(null, 'tatca');
  }
  public activeCity: string = 'tatca';

  public openCity(event: MouseEvent, cityName: string): void {
    // Ngăn chặn sự kiện mặc định khi nhấp vào nút (nếu được gọi từ sự kiện click)
    if (event) {
      event.preventDefault();
    }

    // Ẩn tất cả các tab content
    const tabContents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabContents.length; i++) {
      const tabContent = tabContents[i] as HTMLElement;
      tabContent.style.display = 'none';
    }

    // Xóa lớp active khỏi tất cả các tablinks
    const tabLinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tabLinks.length; i++) {
      const tabLink = tabLinks[i] as HTMLElement;
      tabLink.classList.remove('active');
    }

    // Hiển thị tab content tương ứng với cityName
    const cityElement = document.getElementById(cityName);
    if (cityElement) {
      cityElement.style.display = 'block';
    }

    // Thêm lớp active cho tablink tương ứng
    const activeTabLink = document.querySelector(`.tablinks[onclick="openCity(event, '${cityName}')"]`);
    if (activeTabLink) {
      activeTabLink.classList.add('active');
    }
  }
}

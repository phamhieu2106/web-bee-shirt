import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { forkJoin } from "rxjs";

import { OwlOptions } from "ngx-owl-carousel-o";
import Swal, { SweetAlertResult } from "sweetalert2";

import { SanPham } from "src/app/model/class/san-pham.class";
import { NotificationService } from "src/app/service/notification.service";
import { ProductService } from "src/app/service/product.service";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { ColorService } from "src/app/service/color.service";
import { SizeService } from "src/app/service/size.service";
import { KichCo } from "src/app/model/class/kich-co.class";
import { ProductImageService } from "src/app/service/product-img.service";
import { ProductDetailsService } from "src/app/service/product-details.service";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { CartItem } from "src/app/model/class/cart-item.class";
import { CartService } from "src/app/service/cart.service";
import { AuthenticationService } from "src/app/service/authentication.service";
import { Customer } from "src/app/model/class/customer.class";
import { AddCartItemReq } from "src/app/model/interface/add-cart-item-req.interface";
import { SaleEvent } from "src/app/model/class/sale-event.class";
import { SaleEventService } from "src/app/service/sale-event.service";
import { DiscountService } from "src/app/service/discount.service";
import { Discount } from "src/app/model/class/discount.class";

@Component({
  selector: "app-san-pham-chi-tiet",
  templateUrl: "./san-pham-chi-tiet.component.html",
  styleUrls: ["./san-pham-chi-tiet.component.css"],
})
export class SanPhamChiTietComponent {
  public sanPham: SanPham;
  public colorsOfProduct: MauSac[] = [];
  public curSizesOfProduct: KichCo[] = [];
  public curImgUrls: String[] = [];
  public cartItems: CartItem[] = [];
  public curSaleEvent: SaleEvent;

  public curColorIndex: number = 0;
  public curSizeIndex: number = 0;
  public curQuantity: number = 0;
  public curPrice: number = 0;

  public form: string;
  public design: string;
  public collar: string;
  public sleeve: string;
  public material: string;

  public quantityToCart: number = 1;

  public isLoggedIn: boolean;
  discounts: Discount[] = [];

  sanPhamCT: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private productImgService: ProductImageService,
    private productDetailsService: ProductDetailsService,
    private notifService: NotificationService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private saleEventService: SaleEventService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedInSubj.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });

    this.getIsLoggedInValue();
    this.giDoCuaBinh();
    this.getProductById();
  }

  // public functions
  // 1
  public changeColorIndex(newIndex: number, colorId: number): void {
    this.curColorIndex = newIndex;
    this.curSizeIndex = 0;

    // lấy lại danh sách size
    this.sizeService
      .getAllByProductAndColor(this.sanPham.id, colorId)
      .subscribe({
        next: (sizeResponse: KichCo[]) => {
          this.curSizesOfProduct = sizeResponse;

          // lấy lại số lượng
          this.productDetailsService
            .getQuantityOfOne(
              this.sanPham.id,
              colorId,
              this.curSizesOfProduct[this.curSizeIndex].id
            )
            .subscribe({
              next: (quantity: number) => {
                this.curQuantity = quantity;
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });

          // lấy lại giá
          this.productDetailsService
            .getPriceOfOne(
              this.sanPham.id,
              colorId,
              this.curSizesOfProduct[this.curSizeIndex].id
            )
            .subscribe({
              next: (price: number) => {
                this.curPrice = price;
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });

          // lấy lại đợt gg
          this.saleEventService
            .getSaleEventOfProdDetails2(
              this.sanPham.id,
              colorId,
              this.curSizesOfProduct[this.curSizeIndex].id
            )
            .subscribe({
              next: (saleEvent: SaleEvent) => {
                this.curSaleEvent = saleEvent;
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại danh sách hình ảnh
    this.productImgService
      .getAllUrlBySanPhamAndMauSac(this.sanPham.id, colorId)
      .subscribe({
        next: (urlResponse: String[]) => {
          this.curImgUrls = urlResponse;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  // 2
  public changeSizeIndex(newIndex: number, sizeId: number): void {
    this.curSizeIndex = newIndex;

    // lấy lại số lượng
    this.productDetailsService
      .getQuantityOfOne(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        sizeId
      )
      .subscribe({
        next: (quantity: number) => {
          this.curQuantity = quantity;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại giá
    this.productDetailsService
      .getPriceOfOne(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        sizeId
      )
      .subscribe({
        next: (price: number) => {
          this.curPrice = price;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

    // lấy lại đợt gg
    this.saleEventService
      .getSaleEventOfProdDetails2(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        sizeId
      )
      .subscribe({
        next: (saleEvent: SaleEvent) => {
          this.curSaleEvent = saleEvent;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  // 3
  public formatPrice(price: number): any {
    return this.currencyPipe.transform(price, "VND", "symbol", "1.0-0");
  }

  // 4.1
  public addToCart(): void {
    Swal.fire({
      title: "Thêm sản phẩm này vào giỏ hàng?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const loggedCust = this.authService.getCustomerFromStorage();
        // not login
        if (!loggedCust) {
          this.addToCartLocal();
        } else {
          this.addToCartForLoggedCus(loggedCust);
        }
      }
    });
  }

  // 4.2
  private addToCartLocal(): void {
    this.productDetailsService
      .getByProductColorSize(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        this.curSizesOfProduct[this.curSizeIndex].id
      )
      .subscribe({
        next: (response: SanPhamChiTiet) => {
          if (response.soLuongTon === 0) {
            this.notifService.warning("Sản phẩm này đã hết hàng!");
            return;
          }

          // kiểm tra sp này có trong giỏ hay chưa
          let cartItemsInstorage: CartItem[] = JSON.parse(
            localStorage.getItem("cartItems")
          );
          let chkCartItem = this.checkExistenceForLocalCart(
            response,
            cartItemsInstorage
          );

          if (chkCartItem === null) {
            // chưa có
            // lấy sản phẩm cho spct và thêm
            this.productService
              .getProductByProductDetails(response.id)
              .subscribe({
                next: (productRes: SanPham) => {
                  response.sanPham = productRes;
                  const newCartItem = new CartItem(
                    this.quantityToCart,
                    response
                  );
                  this.cartService.addCartItemToLocalStorage(newCartItem);
                  this.notifService.success(
                    "Thêm sản phẩm vào giỏ thành công!"
                  );
                },
                error: (errorResponse: HttpErrorResponse) => {
                  this.notifService.error(errorResponse.error.message);
                },
              });
          } else {
            // đã có
            if (chkCartItem.soLuong + this.quantityToCart > this.curQuantity) {
              this.notifService.warning(
                "Số lượng trong kho không đủ để thêm sản phẩm!"
              );
            } else {
              // cập nhật số lượng của cart item đã có trong cart
              cartItemsInstorage = cartItemsInstorage.map((item: CartItem) => {
                if (item.spct.id === response.id) {
                  item.soLuong = item.soLuong + this.quantityToCart;
                  return item;
                }
                return item;
              });
              this.cartService.updateCartItemsInStorage(cartItemsInstorage);
              this.notifService.success("Tăng số lượng trong giỏ thành công!");
            }
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  // 5
  private checkExistenceForLocalCart(
    proDetails: SanPhamChiTiet,
    cartItems: CartItem[]
  ): CartItem {
    for (const cartItem of cartItems) {
      if (cartItem.spct.id === proDetails.id) {
        return cartItem;
      }
    }
    return null;
  }

  private addToCartForLoggedCus(loggedCus: Customer): void {
    this.productDetailsService
      .getByProductColorSize(
        this.sanPham.id,
        this.colorsOfProduct[this.curColorIndex].id,
        this.curSizesOfProduct[this.curSizeIndex].id
      )
      .subscribe({
        next: (response: SanPhamChiTiet) => {
          if (response.soLuongTon === 0) {
            this.notifService.warning("Sản phẩm này đã hết hàng!");
            return;
          }

          // kiểm tra sp này có trong giỏ hay chưa
          this.cartService
            .getCartItemByCustomerAndProductDetails(loggedCus.id, response.id)
            .subscribe({
              next: (chkCartItem: CartItem) => {
                if (chkCartItem === null) {
                  // chưa có
                  // lấy sản phẩm cho spct và thêm
                  const addCartItemReq: AddCartItemReq = {
                    quantity: this.quantityToCart,
                    productDetails: response,
                    customerId: loggedCus.id,
                  };

                  this.cartService
                    .addCartItemForLoggedCus(addCartItemReq)
                    .subscribe({
                      next: () => {
                        this.notifService.success(
                          "Thêm sản phẩm vào giỏ thành công!"
                        );
                        this.cartService
                          .getCartItemsOfLoggedCustomer(loggedCus.id)
                          .subscribe({
                            next: (newCartItems: CartItem[]) => {
                              // get prod for prod-details
                              let getProdObservables = [];
                              for (let item of newCartItems) {
                                getProdObservables.push(
                                  this.productService.getProductByProductDetails(
                                    item.spct.id
                                  )
                                );
                              }

                              forkJoin(getProdObservables).subscribe({
                                next: (products: SanPham[]) => {
                                  products.forEach((product, index) => {
                                    newCartItems[index].spct.sanPham = product;
                                    if (index === newCartItems.length - 1) {
                                      this.cartService.updateCartItemsOfLoggedUser(
                                        newCartItems
                                      );
                                      this.cartService.updateCartItemsQuantityOfLoggedUser(
                                        newCartItems.length
                                      );
                                    }
                                  });
                                },
                              });

                              // get sale events for prod-details
                              let observables2 = [];
                              for (let item of newCartItems) {
                                observables2.push(
                                  this.saleEventService.getSaleEventOfProdDetails(
                                    item.spct.id
                                  )
                                );
                              }
                              forkJoin(observables2).subscribe({
                                next: (values: SaleEvent[]) => {
                                  values.forEach((v, index) => {
                                    newCartItems[index].spct.saleEvent = v;
                                    if (index === newCartItems.length - 1) {
                                      this.cartService.updateCartItemsOfLoggedUser(
                                        newCartItems
                                      );
                                      this.cartService.updateCartItemsQuantityOfLoggedUser(
                                        newCartItems.length
                                      );
                                    }
                                  });
                                },
                              });
                            },
                          });
                      },
                      error: (errorResponse: HttpErrorResponse) => {
                        this.notifService.error(errorResponse.error.message);
                      },
                    });
                } else {
                  // đã có
                  if (
                    chkCartItem.soLuong + this.quantityToCart >
                    this.curQuantity
                  ) {
                    this.notifService.warning(
                      "Số lượng trong kho của sản phẩm không đủ để thêm!"
                    );
                  } else {
                    // cập nhật số lượng của cart item đã có trong cart
                    this.cartService
                      .updateCartItemQuantity(
                        chkCartItem.id,
                        chkCartItem.soLuong + this.quantityToCart
                      )
                      .subscribe({
                        next: (updatedCartItem: CartItem) => {
                          this.notifService.success(
                            "Sản phẩm này đã có trong giỏ, cập nhật số lượng trong giỏ thành công!"
                          );
                          this.cartService
                            .getCartItemsOfLoggedCustomer(loggedCus.id)
                            .subscribe({
                              next: (newCartItems: CartItem[]) => {
                                let getProdObservables = [];
                                for (let item of newCartItems) {
                                  getProdObservables.push(
                                    this.productService.getProductByProductDetails(
                                      item.spct.id
                                    )
                                  );
                                }

                                forkJoin(getProdObservables).subscribe({
                                  next: (products: SanPham[]) => {
                                    products.forEach((product, index) => {
                                      newCartItems[index].spct.sanPham =
                                        product;
                                      if (index === newCartItems.length - 1) {
                                        this.cartService.updateCartItemsOfLoggedUser(
                                          newCartItems
                                        );
                                        this.cartService.updateCartItemsQuantityOfLoggedUser(
                                          newCartItems.length
                                        );
                                      }
                                    });
                                  },
                                });
                              },
                            });
                        },
                        error: (errRes: HttpErrorResponse) => {},
                      });
                  }
                }
              },
            });
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  //
  public minusQuantity(): void {
    if (this.quantityToCart === 1) {
      this.notifService.warning("Số lượng sản phẩm phải lớn hơn 0!");
      return;
    }
    --this.quantityToCart;
  }

  //
  public plusQuantity(): void {
    if (this.quantityToCart === this.curQuantity) {
      this.notifService.warning("Số lượng tồn của sản phẩm không đủ!");
      return;
    }
    ++this.quantityToCart;
  }

  // private functions
  // 1
  private getProductById(): void {
    // 1
    this.activatedRoute.params.subscribe((params) => {
      let productId = params["id"];

      // 1.1 get product
      this.productService.getOneById(productId).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;
          this.assignProperties();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });

      // 1.2 get colors of this product
      this.colorService.getAllColorOf1Product(productId).subscribe({
        next: (colorResponse: MauSac[]) => {
          this.colorsOfProduct = colorResponse;

          // 1.2.1 lấy danh sách kích thước của màu thứ 1 và sản phẩm
          this.sizeService
            .getAllByProductAndColor(productId, colorResponse[0].id)
            .subscribe({
              next: (sizeResponse: KichCo[]) => {
                this.curSizesOfProduct = sizeResponse;

                // 1.2.1.1 lấy số lượng
                this.productDetailsService
                  .getQuantityOfOne(
                    productId,
                    colorResponse[0].id,
                    sizeResponse[0].id
                  )
                  .subscribe({
                    next: (quantity: number) => {
                      this.curQuantity = quantity;
                    },
                    error: (errorResponse: HttpErrorResponse) => {
                      this.notifService.error(errorResponse.error.message);
                    },
                  });

                // 1.2.1.2 lấy giá
                this.productDetailsService
                  .getPriceOfOne(
                    productId,
                    colorResponse[0].id,
                    sizeResponse[0].id
                  )
                  .subscribe({
                    next: (price: number) => {
                      this.curPrice = price;
                    },
                    error: (errorResponse: HttpErrorResponse) => {
                      this.notifService.error(errorResponse.error.message);
                    },
                  });

                // 1.2.1.3 lấy đợt giảm giá bằng (productId, colorId, sizeId)
                this.saleEventService
                  .getSaleEventOfProdDetails2(
                    productId,
                    colorResponse[0].id,
                    sizeResponse[0].id
                  )
                  .subscribe({
                    next: (saleEvent: SaleEvent) => {
                      this.curSaleEvent = saleEvent;
                    },
                    error: (errorResponse: HttpErrorResponse) => {
                      this.notifService.error(errorResponse.error.message);
                    },
                  });
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });

          // 1.2.2 lấy danh sách các ảnh của màu thứ nhất và sản phẩm
          this.productImgService
            .getAllUrlBySanPhamAndMauSac(productId, colorResponse[0].id)
            .subscribe({
              next: (urlResponse: String[]) => {
                this.curImgUrls = urlResponse;
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
    });
  }

  // 2
  private assignProperties(): void {
    let anyProductDetails = this.sanPham.sanPhamChiTiets[0];
    this.form = anyProductDetails.kieuDang.ten;
    this.design = anyProductDetails.thietKe.ten;
    this.collar = anyProductDetails.coAo.ten;
    this.sleeve = anyProductDetails.tayAo.ten;
    this.material = anyProductDetails.chatLieu.ten;
  }

  // 3
  private giDoCuaBinh(): void {
    const productImg = document.getElementById(
      "product-img"
    ) as HTMLImageElement;
    const smallImg = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallImg.length; i++) {
      const imgElement = smallImg[i] as HTMLImageElement;
      imgElement.onclick = function () {
        productImg.src = imgElement.src;
      };
    }
  }

  // 4
  private getIsLoggedInValue(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getDiscountOfLog();
    } else {
      this.getDiscountOfNoneLog();
    }
  }

  // 5
  private getDiscountOfNoneLog(): void {
    this.discountService.getAllDiscountsForNoneLog().subscribe({
      next: (discounts: Discount[]) => {
        this.discounts = discounts;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 6
  private getDiscountOfLog(): void {
    const custId = this.authService.getCustomerFromStorage()?.id;
    if (custId) {
      this.discountService.getAllDiscountsOf1Cust(custId).subscribe({
        next: (discounts: Discount[]) => {
          this.discounts = discounts;
        },
        error: (errResp: HttpErrorResponse) => {
          this.notifService.error(errResp.error.message);
        },
      });
    }
  }
}

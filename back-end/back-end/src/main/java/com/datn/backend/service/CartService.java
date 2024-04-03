package com.datn.backend.service;

import com.datn.backend.dto.request.AddCartItemReq;
import com.datn.backend.model.danh_sach.CartItem;

import java.util.List;

public interface CartService {

    List<CartItem> getAllCartItemsByCusId(int cusId);

    CartItem getCartItemByCustomerAndProductDetails(int cusId, int proDetailsId);

    void addCartItem(AddCartItemReq req);

    CartItem updateCartItemQuantity(int cartItemId, String type);

    void deleteItemFromCart(int cartItemId);
}

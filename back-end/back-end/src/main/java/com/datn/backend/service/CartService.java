package com.datn.backend.service;

import com.datn.backend.dto.request.AddCartItemReq;
import com.datn.backend.model.danh_sach.CartItem;

import java.util.List;

public interface CartService {

    List<CartItem> getAllCartItemsOf1Customer(int cusId);

    CartItem getCartItemByCustomerAndProductDetails(int cusId, int proDetailsId);

    void addCartItem(AddCartItemReq req);

    CartItem minusOrPlusCartItemQuantity(int cartItemId, String type);

    CartItem updateCartItemQuantity(int cartItemId, int newQuantity);

    void deleteItemFromCart(int cartItemId);
}

package com.datn.backend.model.khach_hang;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "khach_hang_image")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KhachHangImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String imageName;
    private String imageUrl;
    private String imageId;

    public KhachHangImage(String imageName, String imageUrl, String imageId) {
        this.imageName = imageName;
        this.imageUrl = imageUrl;
        this.imageId = imageId;
    }
}

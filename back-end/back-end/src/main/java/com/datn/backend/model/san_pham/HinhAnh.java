package com.datn.backend.model.san_pham;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hinh_anh")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HinhAnh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String imageName;
    private String imageUrl;
    private String imageId;

    public HinhAnh(String imageName, String imageUrl, String imageId) {
        this.imageName = imageName;
        this.imageUrl = imageUrl;
        this.imageId = imageId;
    }

    @Override
    public String toString() {
        return "HinhAnh{" +
                "id=" + id +
                ", imageName='" + imageName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", imageId='" + imageId + '\'' +
                '}';
    }
}

package com.rentit.mappers;

import com.rentit.dao.interfaces.IImageMapper;
import com.rentit.model.Image;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IImageMapperTest {

    @Autowired
    private IImageMapper imageMapper;

    @Test
    public void getImagesByProductId_returns_all_product_images () {
        int id = 1;
        List<Image>images = imageMapper.getImagesByProductId(id);
        assertThat(images.size()).isEqualTo(2);
    }
    @Test
    public void getImagesByProductId_product_with_no_images_returns_empty_list () {
        //Product with id = 2 has no images inserted in H2 db.
        int id = 2;
        List<Image>images = imageMapper.getImagesByProductId(id);
        assertThat(images).isEmpty();
    }
    @Test
    public void addImages_correctly_insert_images() {
        int id = 4;
        List<Image>images = List.of(
                Image.builder().imageUrl("testUrl1").id(6).build(),
                Image.builder().imageUrl("testUrl2").id(7).build()
        );
        imageMapper.addImages(images, id);
        List<Image>productImages = imageMapper.getImagesByProductId(id);
        assertThat(images).containsAll(productImages);
    }
    @Test
    public void updateImages_removes_old_images_and_adds_new_ones() {
        int productId = 1;

        List<Image> newImages = List.of(
                Image.builder().imageUrl("newUrl1").id(productId).build(),
                Image.builder().imageUrl("newUrl2").id(productId).build()
        );
        List<Image> oldImages = imageMapper.getImagesByProductId(productId);

        assertThat(oldImages).isNotEqualTo(newImages);
        imageMapper.updateImages(productId, newImages);
        List<Image> updatedImages = imageMapper.getImagesByProductId(productId);
        assertThat(updatedImages.size()).isEqualTo(newImages.size());
        assertThat(updatedImages.get(0).getImageUrl()).isEqualTo(newImages.get(0).getImageUrl());
        assertThat(updatedImages.get(1).getImageUrl()).isEqualTo(newImages.get(1).getImageUrl());
        imageMapper.updateImages(productId, oldImages);
    }
}

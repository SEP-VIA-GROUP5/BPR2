package com.rentit.dao.interfaces;

import com.rentit.model.Image;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IImageMapper {
    List<Image> getImagesByProductId(int productId);
    void addImages(List<Image> images, int productId);
}

package com.rentit.dao.interfaces;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IReportMapper {
    void submitProductReport(int reporterId, int productId, String message);

    void submitUserReport(int reporterId, String userEmail, String message);
}

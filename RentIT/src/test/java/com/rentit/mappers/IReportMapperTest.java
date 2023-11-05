package com.rentit.mappers;

import com.rentit.dao.interfaces.IReportMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IReportMapperTest {
    @Autowired
    IReportMapper reportMapper;

    @Test
    void submit_product_report_success() {
        int reporterId = 1;
        int productId = 1;
        String message = "Was broken";
        assertThat(reportMapper.getProductReportCount()).isEqualTo(5);
        reportMapper.submitProductReport(reporterId, productId, message);
        assertThat(reportMapper.getProductReportCount()).isEqualTo(6);
    }

    @Test
    void submit_user_report_success() {
        int reporterId = 1;
        int userId = 2;
        String message = "Inappropriate";
        assertThat(reportMapper.getUserReportCount()).isEqualTo(5);
        reportMapper.submitUserReport(reporterId, userId, message);
        assertThat(reportMapper.getUserReportCount()).isEqualTo(6);
    }
}

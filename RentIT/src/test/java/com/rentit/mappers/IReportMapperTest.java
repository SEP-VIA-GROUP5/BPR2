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
    void submitProductReport_successfully_reports_product() {
        int reporterId = 1;
        int productId = 1;
        String message = "Was broken";
        int initialReportCount = reportMapper.getProductReportCount();
        reportMapper.submitProductReport(reporterId, productId, message);
        assertThat(reportMapper.getProductReportCount()).isEqualTo(initialReportCount + 1);
    }

    @Test
    void submitUserReport_successfully_reports_user() {
        int reporterId = 1;
        int userId = 2;
        String message = "Inappropriate";
        int initialReportCount = reportMapper.getUserReportCount();
        reportMapper.submitUserReport(reporterId, userId, message);
        assertThat(reportMapper.getUserReportCount()).isEqualTo(initialReportCount+1);
    }
}

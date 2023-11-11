package com.rentit.mappers;

import com.rentit.dao.interfaces.IInquiryMapper;
import com.rentit.model.Inquiry;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IInquiryMapperTest {
    @Autowired
    IInquiryMapper inquiryMapper;

    @Test
    public void add_inquiry_successfully() {
        LocalDate now = LocalDate.now();
        Inquiry inquiry = Inquiry.builder()
                .productId(1)
                .message("Want to rent this item")
                .timeStamp(now)
                .senderId(2)
                .receiverId(1)
                .viewed(true)
                .viewedAt(now)
                .rentStart(now)
                .rentEnd(now)
                .build();

        inquiryMapper.addInquiry(inquiry);
        Inquiry resultInquiry = inquiryMapper.getInquiryById(inquiry.getInquiryId());
        assertThat(resultInquiry).isEqualTo(inquiry);
    }
}

package com.rentit.mappers;

import com.rentit.dao.interfaces.IInquiryMapper;
import com.rentit.dao.interfaces.IUserMapper;
import com.rentit.model.Inquiry;
import com.rentit.model.User;
import com.rentit.model.dto.InquiryDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IInquiryMapperTest {
    @Autowired
    IInquiryMapper inquiryMapper;
    @Autowired
    IUserMapper userMapper;

    @Test
    public void add_inquiry_successfully() {
        LocalDate now = LocalDate.now();
        Inquiry inquiry = Inquiry.builder()
                .productId(2)
                .message("Want to rent this item")
                .timeStamp(now)
                .senderId(2)
                .receiverId(2)
                .viewed(true)
                .viewedAt(now)
                .rentStart(now)
                .rentEnd(now)
                .build();

        inquiryMapper.addInquiry(inquiry);
        Inquiry resultInquiry = inquiryMapper.getInquiryById(inquiry.getInquiryId());
        assertThat(resultInquiry).isEqualTo(inquiry);
    }

    @Test
    public void get_all_received_inquiries_size_is_correct() {
        int receiverId = 1;
        User receiver = userMapper.getUserById(receiverId);
        List<InquiryDTO> receivedInquiries = inquiryMapper.getReceivedInquiries(receiverId);
        assertThat(receivedInquiries)
                .isNotEmpty()
                .allSatisfy(
                        inquiryDTO ->
                                assertThat(inquiryDTO.getUserDTO().getEmail()).isNotEqualTo(receiver.getEmail())
                );
    }

    @Test
    public void set_viewed_sets_inquiry_as_viewed_with_date_stamp() {
        int inquiryId = 3;
        LocalDate now = LocalDate.now();
        inquiryMapper.setViewed(inquiryId, now);

        Inquiry resultInquiry = inquiryMapper.getInquiryById(inquiryId);
        assertThat(resultInquiry.isViewed()).isTrue();
        assertThat(resultInquiry.getViewedAt()).isEqualTo(now);
    }

    @Test
    public void get_sent_inquiries_returns_only_sent_inquiries() {
        int senderId = 2;
        User sender = userMapper.getUserById(senderId);
        List<InquiryDTO> sentInquiries = inquiryMapper.getSentInquiries(senderId);
        assertThat(sentInquiries)
                .isNotEmpty()
                .allSatisfy(inquiryDTO -> assertThat(inquiryDTO.getUserDTO().getEmail()).isEqualTo(sender.getEmail()));
    }
}

package com.rentit.dao.interfaces;

import com.rentit.model.Inquiry;
import com.rentit.model.PriceFilteringColumn;
import com.rentit.model.dto.InquiryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface IInquiryMapper {

    void addInquiry(Inquiry inquiry);
    List<InquiryDTO> getReceivedInquiries(int receiverId);
    void setViewed(int inquiryId, LocalDate viewedAt);
    Inquiry getInquiryById(int inquiryId);
    List<InquiryDTO> getSentInquiries(int senderId);
    void deleteInquiry(int userId, int inquiryId);
    List<InquiryDTO> getAllReceivedInquiriesFiltered(int pageNum, int n, Map<PriceFilteringColumn, String> processedMap);
}

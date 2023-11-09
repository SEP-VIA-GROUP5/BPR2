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
    List<InquiryDTO> getAllReceivedInquiries(int userId);
    void setViewed(int inquiryId, LocalDate now);

    Inquiry getInquiry(int inquiryId);

//    void setAccepted(int inquiryId, LocalDate now);
    List<InquiryDTO> getAllMyInquiries(int id);

    void deleteInquiry(int id, int inquiryId);

    List<InquiryDTO> getAllReceivedInquiriesFiltered(int pageNum, int n, Map<PriceFilteringColumn, String> processedMap);
}

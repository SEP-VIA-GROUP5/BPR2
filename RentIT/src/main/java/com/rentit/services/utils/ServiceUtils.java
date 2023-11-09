package com.rentit.services.utils;

import com.rentit.model.PriceFilteringColumn;

import java.util.HashMap;
import java.util.Map;

public class ServiceUtils {
    private static ServiceUtils serviceUtils = null;

    private ServiceUtils(){
    }

    public static synchronized ServiceUtils getInstance(){
        if(serviceUtils == null){
            serviceUtils = new ServiceUtils();
        }
        return serviceUtils;
    }

    public Map<PriceFilteringColumn, String> processFiltering(Map<String, String> filters) {
        Map<PriceFilteringColumn, String> processedMap = new HashMap<>();
        for(Map.Entry<String, String> entry : filters.entrySet()) {
            StringBuilder sb = new StringBuilder();
            PriceFilteringColumn pfc = new PriceFilteringColumn();
            sb.append(entry.getKey());
            int split = sb.indexOf("_");
            if(split < 0) {
                pfc.setColumnName(sb.toString());
                pfc.setBoundary("equals");
            }
            else{
                pfc.setColumnName(sb.substring(0,split));
                pfc.setBoundary(sb.substring(split+1));
            }
            processedMap.put(pfc, entry.getValue());
        }
        return processedMap;
    }
}

package com.example.accessingdatapostgres;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonResponse<T> {
    @Builder.Default
    private String status = "success";
    @Builder.Default
    private String message = "request succeeded.";
    private T data;
}
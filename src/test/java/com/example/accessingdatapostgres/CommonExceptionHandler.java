package com.example.accessingdatapostgres;

import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class CommonExceptionHandler extends ResponseEntityExceptionHandler {

  // 404: Resource Not Foundエラーを処理するよ
  // ※ これをハンドリングするには application.properties の設定も必要だよ
  @Override
  protected ResponseEntity handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
    ServletWebRequest req = (ServletWebRequest)request;
    log.warn("resource not found. {}", req.getRequest().getRequestURI());
    return new ResponseEntity(
            CommonResponse.builder().status("failure").message("resource not found.").build(),
            HttpStatus.NOT_FOUND);
  }

  // 400: 入力チェックエラーを処理するよ
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<CommonResponse> handleValidationError(ConstraintViolationException e) {
    // 入力エラー項目とメッセージをカンマ区切り(,)に追加。
    String validationErrorMessages =
        e.getConstraintViolations().stream()
            .map(cv -> cv.getPropertyPath().toString() + ":" + cv.getMessage())
            .collect(Collectors.joining(", "));
    log.info("Bad request. {}", validationErrorMessages);
    return new ResponseEntity<>(
        CommonResponse.builder().status("failure").message(validationErrorMessages).build(),
        HttpStatus.BAD_REQUEST);
  }

  // 500: それ以外の不明なエラーを処理するよ
  @ExceptionHandler
  public ResponseEntity<CommonResponse> handleException(Exception e) {
    log.error("Request failed.", e);
    return new ResponseEntity<>(
        CommonResponse.builder().status("failure").message("error has occurred.").build(),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
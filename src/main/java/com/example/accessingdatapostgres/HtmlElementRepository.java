package com.example.accessingdatapostgres;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface HtmlElementRepository extends JpaRepository<HtmlElement, Long> {
	List<HtmlElement> findByTagName(String tagName);
	List<HtmlElement> findByDocIdOrderByClientRectTop(Long docId);
	@Query(name = "HtmlElement.searchByText2")
	List<HtmlElement> searchByText(@Param("searchWord") String searchWord);
}


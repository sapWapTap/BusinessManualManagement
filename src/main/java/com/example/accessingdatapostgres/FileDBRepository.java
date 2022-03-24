package com.example.accessingdatapostgres;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface FileDBRepository extends JpaRepository<FileDB, Long> {
	List<FileDB> findByName(String name);
}


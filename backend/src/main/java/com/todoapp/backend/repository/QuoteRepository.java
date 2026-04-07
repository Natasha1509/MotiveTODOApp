package com.todoapp.backend.repository;

import com.todoapp.backend.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

    @Query(value = "SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Quote> findRandom();
}

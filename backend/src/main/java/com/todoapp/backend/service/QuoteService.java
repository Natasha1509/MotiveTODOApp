package com.todoapp.backend.service;

import com.todoapp.backend.model.Quote;
import com.todoapp.backend.repository.QuoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;

    public QuoteService(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    public Quote getRandomQuote() {
        return quoteRepository.findRandom()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No quotes found"));
    }

    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }
}

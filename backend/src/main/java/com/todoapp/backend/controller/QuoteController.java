package com.todoapp.backend.controller;

import com.todoapp.backend.model.Quote;
import com.todoapp.backend.service.QuoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "*")
public class QuoteController {

    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping("/random")
    public ResponseEntity<Quote> getRandom() {
        return ResponseEntity.ok(quoteService.getRandomQuote());
    }
}

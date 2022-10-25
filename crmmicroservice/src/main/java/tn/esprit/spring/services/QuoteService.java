package tn.esprit.spring.services;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
import java.util.List;

public interface QuoteService {
    public void addQuote(Quote q );
    public void updateQuote(Quote q);
    public Quote getQuoteById(String quoteId);
    public void deleteQuote(String quoteId ,Long idoppo);
    public List<Quote> getQuotes();
    public void assignquotetoopp (Quote q,String quoteId );
}

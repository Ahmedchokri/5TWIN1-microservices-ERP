package tn.esprit.spring.services;

import tn.esprit.spring.models.*;
import tn.esprit.spring.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class QuoteServiceImpl implements  QuoteService{
    @Autowired
    QuoteRepo qte ;
    @Autowired
    OpportunityRepo opp;

    @Override
    public void addQuote(Quote q) {
        qte.save(q);
    }

    @Override
    public void updateQuote(Quote q) {
    qte.save(q);


    }

    @Override
    public Quote getQuoteById(String quoteId) {
        return qte.findById(quoteId).get();
    }

    @Override
    public void deleteQuote(String quoteId,Long idoppo) {
    	Opportunity oppor =opp.findById(idoppo).get();
      /* 
         List<Quote>  quotes= new ArrayList<Quote>();
     	for (Quote quote : oppo()){
			if (quote.getId().equals(quoteId)==false){
				quotes.add(quote);
			}
		}
     	oppor.setQuotes(quotes);
     	opp.save(oppor);  
     	qte.deleteById(quoteId);*/
    }

    @Override
    public List<Quote> getQuotes() {
        return (List<Quote>) qte.findAll();
    }

	@Override
	public void assignquotetoopp(Quote q, String oppId) {
	/*	// TODO Auto-generated method stub
		qte.save(q);
		List<Quote>  quotes= new ArrayList<Quote>();
		quotes =opp.findById(oppId).get().getQuotes();
		quotes.add(q);
		Opportunity opportunity = opp.findById(oppId).get();
		opportunity.setQuotes(quotes);
		opp.save(opportunity)	;*/
	}

 
}

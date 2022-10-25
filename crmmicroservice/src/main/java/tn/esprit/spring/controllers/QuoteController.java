package tn.esprit.spring.controllers;

import tn.esprit.spring.models.Quote;
import tn.esprit.spring.services.QuoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/template")
public class QuoteController {
	@Autowired
	QuoteService qte ;


	@GetMapping("/getAll")
	public List<Quote> getAllQuotes()
	{
		return qte.getQuotes();
	}

	@GetMapping("/getBy/{id}")
	public Quote getById(@PathVariable("id") String id )
	{
		return qte.getQuoteById(id);
	}

	@PostMapping("/postQuote")
	public void postQuote(@RequestBody Quote q)
	{
		qte.addQuote(q);
	}

	@PutMapping("/putQuote")
	public void putQuote (@RequestBody Quote q )
	{
		qte.updateQuote(q);
	}

	@DeleteMapping("/delete/{id}/{idoppo}")
	public void deleteQuote (@PathVariable("id") String id,@PathVariable("idoppo") Long idoppo )
	{
		qte.deleteQuote(id,idoppo);
	}
	@PostMapping("/assignquotetoopp/{quoteid}")
	public void assignquotetoopp (@RequestBody Quote q,@PathVariable("quoteid") String id )
	{
		qte.assignquotetoopp(q, id);
	}

}

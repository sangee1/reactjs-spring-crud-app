package com.booklist.springbootbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booklist.springbootbackend.exception.ResourceNotFoundException;
import com.booklist.springbootbackend.model.Book;
import com.booklist.springbootbackend.repository.BookRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class BookController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping("/books")
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
		
	
	@PostMapping("/books")
	public Book createBook(@RequestBody Book book) {
		return bookRepository.save(book);
		
	}
	
	@GetMapping("/books/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable Long id) {
		Book book = bookRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Book ID doesnt exist"));
		return ResponseEntity.ok(book);
	}
	
	//update Book details
	@PutMapping("/books/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails){
		Book book = bookRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Book ID doesnt exist"));
		book.setName(bookDetails.getName());
		book.setAuthor(bookDetails.getAuthor());
		Book updatedBook = bookRepository.save(book);
		return ResponseEntity.ok(updatedBook);
	}
	
	@DeleteMapping("/books/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id){
		Book book = bookRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Book ID doesnt exist"));
		bookRepository.delete(book);
		Map<String,Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
		
	}
	
	

}

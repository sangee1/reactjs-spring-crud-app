package com.booklist.springbootbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.booklist.springbootbackend.model.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}

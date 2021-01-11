package com.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{

}

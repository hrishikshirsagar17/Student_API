package com.spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.model.Student;

import com.spring.repo.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;
	
	
	public List<Student> getAllStudents(){
		List<Student> students = new ArrayList<>();
		
		studentRepository.findAll()
		.forEach(students::add);
		
		return students;
	}
	
	public Optional<Student> getStudent(Integer id) {
		return studentRepository.findById(id);
	}
	
	public void addStudent(Student student) {
		studentRepository.save(student);
	}
	
	public void updateStudent(Student student, Integer id) {
		studentRepository.save(student);
	}
	
	public void deleteStudent(Integer id) {
		studentRepository.deleteById(id);
	}
}

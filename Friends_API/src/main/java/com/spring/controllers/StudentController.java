package com.spring.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.model.Student;
import com.spring.services.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/app")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	
	@GetMapping(value = "/students")
	public List<Student> getAllStudents(){
		return studentService.getAllStudents();
	}
	
	@GetMapping(value = "/students/{id}")
	public Optional<Student> getStudentById(@PathVariable("id") Integer id) {
		return studentService.getStudent(id);
	}
	
	@PostMapping(value = "/students")
	public void addStudent(@RequestBody Student student) {
		studentService.addStudent(student);
	}
	
	@PutMapping(value = "/students/{id}")
	public void updateStudent(@PathVariable("id") Integer id, @RequestBody Student student) {
		studentService.updateStudent(student, id);
	}
	
	@DeleteMapping(value = "/students/{id}")
	public void deleteStudents(@PathVariable("id") Integer id) {
		studentService.deleteStudent(id);
	}
}

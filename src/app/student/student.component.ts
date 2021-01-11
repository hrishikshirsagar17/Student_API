import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
export class Student {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public department: string

  ) {
  }
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[];
  closeResult: string;
  editForm: FormGroup;
  deleteId: number;
  constructor(private httpClient: HttpClient,
              private modalService: NgbModal,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStudents();
    this.editForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      department: [''],
    }); 
  }

  getStudents(){
    this.httpClient.get<any>('http://localhost:8080/app/students').subscribe(
      response => {
        console.log(response);
        this.students = response;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/app/students';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, student: Student) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('fname').setAttribute('value', student.firstName);
    document.getElementById('lname').setAttribute('value', student.lastName);
    document.getElementById('dept').setAttribute('value', student.department);
    document.getElementById('email2').setAttribute('value', student.email);
 }

 openEdit(targetModal, student: Student) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  id: student.id, 
  firstName: student.firstName,
  lastName: student.lastName,
  email: student.email,
  department: student.department
});
}

onSave() {
  const editURL = 'http://localhost:8080/app/students/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

openDelete(targetModal, student: Student) {
  this.deleteId = student.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = 'http://localhost:8080/app/students/' + this.deleteId ;
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

}

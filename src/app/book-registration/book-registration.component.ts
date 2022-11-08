import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-registration',
  templateUrl: './book-registration.component.html',
  styleUrls: ['./book-registration.component.scss']
})
export class BookRegistrationComponent implements OnInit {
  bookRegistrationForm!: FormGroup ;
  file!: File;
  fileName = '';  
uploadProgress!:number;  
uploadSub!: '';
selectedFiles!: FileList;  

  constructor(private http:HttpClient,private formBuilder:FormBuilder,private userloginService:UserLoginServiceService, private router:Router) { }

  ngOnInit(): void {
    // const formData = new FormData();
    // formData.append('imagePath',this.file);
    // formData.append('bookTitle',this.bookRegistrationForm.value.bookTitle);
    // formData.append('category',this.bookRegistrationForm.value.category);
    // formData.append('price',this.bookRegistrationForm.value.price);
    // formData.append('publisherName',this.bookRegistrationForm.value.publisherName);
    // formData.append('bookAuthorName',this.bookRegistrationForm.value.bookAuthorName);
    // formData.append('isActive',this.bookRegistrationForm.value.isActive);
    // formData.append('bookContent',this.bookRegistrationForm.value.bookContent);

    this.bookRegistrationForm= this.formBuilder.group({
      bookTitle:['',Validators.required],
      category:['',Validators.required],
      imagePath:[''],
      price:['',Validators.required],
      publisherName:['',Validators.required],
      isActive:['',Validators.required],
      bookContent:['',Validators.required],
      bookAuthorName:['',],
  })
}
signUp(){
  this.router.navigate(['/login']);
}


addBookRegistered(){
  //this.file = this.selectedFiles.item(0);
  console.log(this.selectedFiles);
  console.log(this.bookRegistrationForm.value);
  this.userloginService.addBookRegistered(this.bookRegistrationForm.value,this.file).subscribe(data=>{
    alert(data);
    alert("Book Created Successfully");
    this.router.navigate(["booklist"]);
  },error=>alert("Something went wrong"));
}

addBookRegisteredWithoutFile(){
  this.userloginService.addBookRegisteredWithoutFile(this.bookRegistrationForm.value).subscribe(data=>{
   // alert(data);
    alert("Book Created Successfully");
    this.router.navigate(["booklist"]);
  },error=>alert("Something went wrong"));
}

getBookList(){
  this.router.navigate(['/booklist']);
}

onFilechange(event: any) {
  //alert(event.target.files[0]);
  console.log(event.target.files[0])
  this.file = event.target.files[0]
  if (this.file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
  } else {
    alert('invalid format!');
  }
}

}

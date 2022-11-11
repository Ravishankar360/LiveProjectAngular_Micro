import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Book } from '../book';

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
selectedFile :any;
  imagePath: string | ArrayBuffer | null | undefined;
  book = new Book();
  loggedIn: any;
  user: any;

  constructor(private http:HttpClient,private formBuilder:FormBuilder,
    private httpClient: HttpClient,private userloginService:UserLoginServiceService, 
    private router:Router) { }

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

    this.loggedIn = this.userloginService.isLoggedIn();
    this.user = localStorage.getItem("user");

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
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imagePath = reader.result;
    };
    
  if (this.file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
  } else {
    alert('invalid format!');
  }

}
public onFileChanged(event:any) {
  console.log(event);
  this.selectedFiles = event.target.files[0];

  // Below part is used to display the selected image
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event2) => {
    this.imagePath = reader.result;
  };
}

saveBook() {
  // this.book.createdBy =this.user;
   const uploadData = new FormData();
   console.log("Checking book content"+this.book);
   uploadData.append('imagePath', this.selectedFile, this.selectedFile.name);
   this.selectedFile.imageName = this.selectedFile.name;
   this.httpClient.post('http://localhost:8083/book/upload/logo', uploadData, { observe: 'response' })
     .subscribe((response) => {
       if (response.status === 200) {
         this.userloginService.addBookRegisteredWithoutFile(this.book).subscribe(
           (book) => {
             this.router.navigate(['home']);
           }
         );
         alert("Data added successfully");
         console.log('Image uploaded successfully');
       } else {
         console.log('Image not uploaded successfully');
         alert("Book addition failed");
       }
     }
     );

   //}
   // else{
   //   this.addBookSubmit();

   // }
 }
 

}

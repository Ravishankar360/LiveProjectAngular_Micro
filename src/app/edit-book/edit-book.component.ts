import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  updateRegistrationForm!: FormGroup ;
  bid !: number;
  book = new Book();
 

  constructor(private formBuilder:FormBuilder,private userloginService:UserLoginServiceService, 
    private router:Router, private _activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.bid = this._activatedRouter.snapshot.params['bid'];
     console.log(this.bid);
     var a: number= +this.bid;
     this.userloginService.viewBookById(a).subscribe(
     data=>{
      console.log("data received");
      this.book = data;
     },
      error => console.log("Exception Occured") )
    
    this.updateRegistrationForm= this.formBuilder.group({
      bookTitle:[''],
      category:[''],
      imagePath:[''],
      price:['',],
      publisherName:[''],
      isActive:[''],
      bookContent:[''],
      bookAuthorName:[''],
  })
}
signUp(){
  this.router.navigate(['/login']);
}

updateBookRegistered(){
  console.log(this.updateRegistrationForm.value);
  this.userloginService.updateBookRegistered(this.bid,this.updateRegistrationForm.value).subscribe(data=>{
    alert("Book Data Updated Successfully");
    this.router.navigate(["booklist"]);
  },error=>alert("Something went wrong"));
}

getBookList(){
  this.router.navigate(['/booklist']);
}


}


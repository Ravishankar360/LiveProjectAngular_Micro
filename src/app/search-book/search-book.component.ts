import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { Book } from '../book';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {
  books: Array<Book> = [];
  book = new Book()
  searchBookForm !: FormGroup;
  manuscriptdatasorce: any;
  dataSource = new MatTableDataSource();
  @ViewChild('sevenTable', { static: true }) sevenTable: MatPaginator | undefined;
  constructor(private userloginService:UserLoginServiceService, private router:Router,private formBuilder:FormBuilder) { }

  
  ngOnInit(): void {
    this.searchBookForm =this.formBuilder.group({
      bookTitle: ['',Validators.required],
      bookAuthorName : ['',Validators.required],
      publisherName: ['',Validators.required],
    }) 
    
  }
  trackTableDataSource: any;


  signUp(){
    this.router.navigate(['/login']);
  }

  getBookList(){
    this.router.navigate(['/booklist']);
  }

  searchBook(){
    console.log(this.searchBookForm.value);
    this.userloginService.bookSearch(this.searchBookForm.value).subscribe(data=>{
      //alert("Book Search Successfully");
      this.manuscriptdatasorce = data
      console.log(this.manuscriptdatasorce)
      if (this.manuscriptdatasorce.length > 0) {  
        console.log(data) 
        this.trackTableDataSource =  this.manuscriptdatasorce;
        //alert(this.trackTableDataSource);
      }
      else {
        alert('No record is found.');
      }
      //this.router.navigate(["login"]);
    },error=>alert("Something went wrong"));
  }isEmpty()
  {
    if (this.manuscriptdatasorce == null)
    {
      return true;
    }
    else { return false; }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchBookComponent } from '../search-book/search-book.component';

@Component({
  selector: 'app-get-book-list',
  templateUrl: './get-book-list.component.html',
  styleUrls: ['./get-book-list.component.scss']
})
export class GetBookListComponent implements OnInit {
  books: Array<Book> = [];
  constructor(private userloginService:UserLoginServiceService, private router:Router,public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchBookComponent, {
      width: '100%',
      
    });
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.userloginService.getBookListFromRemote().subscribe(
      data=> this.books = data ,error=>console.log("Exception occurred 1"))
  }isEmpty()
  {
    if (this.books == null)
    {
      return true;
    }
    else { return false; }
  }

  signUp(){
    this.router.navigate(['/login']);
  }

  getBookList(){
      this.router.navigate(['/booklist']);
  }

  addBookRegistered() {
    this.router.navigate(['/bookregistration']);
  }

  goToUpdateBook(bid: number) {
    console.log("bid: "+ bid);
    this.router.navigate(['/editBook', bid]);
  }


  goToViewBook(bid: number){
    console.log("bid: "+ bid);
    this.router.navigate(['/viewBook', bid]);
  }
  
  deleteBookById(bid: number){
    if (confirm('Are you sure this book deleted?'))
    return this.userloginService.deleteBookById(bid).subscribe(
      success => {
        alert("Book successfully deleted !!");
        this.getBookList();
      },
      error=> {console.log("Exception occured 2"); this.getBooks()}) 
      else
      return bid
  }



  goToViewBookDetails(bid:number){
    //alert(bid);
    this.router.navigate(['/viewBook', bid]);
  }

}

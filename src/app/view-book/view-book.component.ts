import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { UserLoginServiceService } from '../user-login-service.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  bid !: number;
  book = new Book();

  constructor(private userloginService:UserLoginServiceService, private router:Router,private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
     this.bid = this._activatedRouter.snapshot.params['bid'];
     console.log(this.bid);
     var a: number= +this.bid;
     //this.book1.bid = this.bid;
     this.userloginService.viewBookById(a).subscribe(
     data=>{
      console.log("data received");
      this.book = data;
     },
      error => console.log("Exception Occured") )
  }

  signUp(){
    this.router.navigate(['/login']);
  }

  bookList(){
    this.router.navigate(['/booklist']);
  }

}

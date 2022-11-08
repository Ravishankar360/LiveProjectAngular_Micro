import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class UserLoginServiceService {

  user: User= new User();
  private baseUrl="http://localhost:8083/user/login";
  constructor(private httpClient: HttpClient) { }

  loginUser(user:User):Observable<Object>{
    console.log(user);
    return this.httpClient.post("http://localhost:8083/user/login",user);
  }

  userRegistration(user:User):Observable<Object>{
    console.log(user);
    return this.httpClient.post("http://localhost:8083/user/addUser",user);
  }

  addBookRegisteredWithoutFile(book:Book) :Observable<Object>{
    console.log(book);
    let header = new HttpHeaders();
    header = header.append('content-type','multipart/form-data')
  
    return this.httpClient.post("http://localhost:8082/book/addbook",book);
  
  }

  addBookRegistered(book:Book ,file: File):Observable<Object>{
    console.log(book);
    console.log(file);
    let header = new HttpHeaders();
    header = header.append('content-type','multipart/form-data')
  
    return this.httpClient.post("http://localhost:8082/book/addbookwithImage",book);
  }
  
  getBookListFromRemote(): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8082/book/getBookData");
  }

  deleteBookById(bid: number): Observable<any> {
    //alert("userLoginService:-"+bid);
    return this.httpClient.delete<any>("http://localhost:8082/book/deleteBook/"+ bid);
  }

  updateBookRegistered(bid:number,book:Book):Observable<Object>{
    console.log(book.bid);
    return this.httpClient.put("http://localhost:8082/book/updateBook/"+bid,book);
  }

  viewBookById(bookId : number): Observable<Book> {
    //alert(bookId)
    return this.httpClient.get<any>('http://localhost:8082/book/getBooks/'+bookId);
  }

  bookSearch(book:Book) :Observable<Object>{
    console.log(book);
    let header = new HttpHeaders();
    header = header.append('content-type','multipart/form-data')
  
    return this.httpClient.post("http://localhost:8082/book/searchbook",book);
  }
}

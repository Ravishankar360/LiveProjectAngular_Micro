import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserLoginServiceService } from '../user-login-service.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-author-login',
  templateUrl: './author-login.component.html',
  styleUrls: ['./author-login.component.scss']
})
export class AuthorLoginComponent implements OnInit {
  user: User= new User();
  userLogin !: FormGroup;
  constructor(private loginService: UserLoginServiceService, private router: Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userLogin = this.formBuilder.group({
      roleType : ['',Validators.required],
      userName : ['',Validators.required],
      password : ['',Validators.required]
    })
    
  } 

  login(){
    console.log(this.userLogin.value);
    this.loginService.loginUser(this.userLogin.value).subscribe(data=>{
      alert("Login Successfully");
      this.router.navigate(["booklist"]);
    },error=>alert("Please enter correct username and password and Please check user role correct or not !!!"));
  }
  
  userlogin(){
    //alert(this.user);
    console.log(this.user);
    this.loginService.loginUser(this.user).subscribe(data=>{
      alert("Login Successfully");
      this.router.navigate(["booklist"]);
    },error=>alert("Please enter correct username and password"));
  }
  registrationUser(){
    this.router.navigate(['/registration']);
  }

  signUp(){
    this.router.navigate(['/login']);
  }
}

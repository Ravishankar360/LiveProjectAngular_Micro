import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthorLoginComponent } from './author-login/author-login.component';
import { BookRegistrationComponent } from './book-registration/book-registration.component';
import { GetBookListComponent } from './get-book-list/get-book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { SearchBookComponent } from './search-book/search-book.component';

const routes: Routes = [
  {path: '', component: AuthorLoginComponent},
  {path: 'login', component: AuthorLoginComponent},
  {path: 'registration', component: UserRegistrationComponent},
  {path: 'bookregistration', component: BookRegistrationComponent},
  {path: 'booklist', component: GetBookListComponent},
  {path: 'editBook/:bid', component: EditBookComponent},
  {path: 'viewBook/:bid', component: ViewBookComponent},
  {path: 'searchBook/:book', component: SearchBookComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

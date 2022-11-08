import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { BookRegistrationComponent } from './book-registration/book-registration.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DigitalBookApp';
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(BookRegistrationComponent, {
      width: '50%',
      
    });

   
}
openDialog1(): void {
  const dialogRef1 = this.dialog.open(UserRegistrationComponent, {
    width: '50%',
    
});
}

}


import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  htmlIput = "";
  user = "";
  dataSource = "da";
  isValid: boolean = false;
  errorLogin: boolean = false;
  error: string = '';
 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.authService.singUp(form.value.email, form.value.password).subscribe(restData => {

      console.log(restData)
      switch (restData.message) {
        case 'Email not exist!!!':
          this.errorLogin = true;
          this.error = "Email not exist!!!";
          break;
        case 'Password is incorrect!!!':
          this.errorLogin = true;
          this.error = "Password is incorrect!!!";
          break;
          case 'Ok!!':
           this.authService.setAuth(true);
           const user=new User(form.value.email,form.value.password,restData.jwt)
           this.authService.user.next(user);
           localStorage.setItem('userData',JSON.stringify(user));
            this.router.navigate(['/']);
            break
      }
    });
  }

  onUpdateServerName(event: Event) {
    //  console.log(localStorage.getItem('dataSource'));
  }
}

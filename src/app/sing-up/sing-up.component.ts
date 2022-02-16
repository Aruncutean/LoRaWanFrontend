import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SingUpService } from './sing-up.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  errorLogin: boolean = false;
  error: string = '';
  isValid: boolean = false;
 
  constructor(private singUp: SingUpService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    if (form.value.password1 !== form.value.password2) {
      this.errorLogin = true;
      this.error = "Password!!!";
    } else {
      this.errorLogin = false;
      this.error = "";

      this.singUp.singUp(form.value.lastname,form.value.firstname,form.value.username,form.value.email,form.value.password1).subscribe(data=>{
  
        if(data.message==="Account is create"){
           console.log(data.message);
           this.router.navigate(['/Auth']);
        }else{
          this.errorLogin =true;
          this.error=data.message;
        }
      })
    }
  }

  

}

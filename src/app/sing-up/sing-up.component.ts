import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SingUpService } from './sing-up.services';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  errorLogin: boolean = false;
  error: string = '';
  isValid: boolean = false;
  constructor(private singUp: SingUpService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    if (form.value.password1 !== form.value.password2) {
      this.errorLogin = true;
      this.error = "Password!!!1";
    } else {
      this.errorLogin = false;
      this.error = "";
      console.log(form.value.username);
      console.log(form.value.firstname);
      console.log(form.value.email);
      console.log(form.value.lastname);
      
      this.singUp.singUp(form.value.lastname,form.value.firstname,form.value.username,form.value.email,form.value.password1).subscribe(data=>{
        console.log(data);
      })
      
      this.singUp.setRol(form.value.email).subscribe(data=>
      {

      })
      
    }
  }

  

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { MyAccountService } from './my-account.service';

interface DateDialog {
  name: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  userRol: string;

  constructor(private myAccount: MyAccountService, private dialog: MatDialog,private auth:AuthService) { }

  ngOnInit(): void {
    this.myAccount.getUserInfo().subscribe(date => {
      this.userName = date.userName;
      this.email = date.email;
      this.firstName = date.firstName;
      this.lastName = date.lastName;
      this.userRol = date.rol;
      console.log(date);
    },error=>{
      if(error.status===403)
      {
        this.auth.reload();
       
      }
 })

  }

  
}




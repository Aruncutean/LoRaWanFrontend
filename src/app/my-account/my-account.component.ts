import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private myAccount: MyAccountService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.myAccount.getUserInfo().subscribe(date => {
      this.userName = date.userName;
      this.email = date.email;
      this.firstName = date.firstName;
      this.lastName = date.lastName;
      this.userRol = date.rol;
      console.log(date);
    })

  }

  cerereAdmin() {
    const dialogRef = this.dialog.open(Dialog, {
      width: '300px',
      data: { name: this.userName }
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html',
})
export class Dialog implements OnInit {
  name: string;
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) private dataDialog: DateDialog
  ) {

  }
  ngOnInit(): void {
    this.name=this.dataDialog.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  makeAdminUtilizator() {

  }
}

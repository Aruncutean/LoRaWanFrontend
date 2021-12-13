import { Component } from "@angular/core";


@Component({
    selector: 'app-server',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
 htmlIput="";
 user="";
    onUpdateServerName(event: Event) {
       this.htmlIput=(<HTMLInputElement>event.target).value;
    }

}
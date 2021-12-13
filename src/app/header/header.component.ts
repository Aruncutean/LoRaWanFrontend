import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

interface Auth {
    a: String;
    name: string;
}

@Component({
    selector: 'header-server',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
    isAuthenticated = false;
    private userSub: Subscription | undefined;
    auth: Auth[] = [
        { a: '/Auth', name: 'Login' },
        { a: '/SingUp', name: 'Sing Up' },
    ]
 
    userName:string="";
    constructor(private authService: AuthService,private router: Router) {

    }
  
    ngOnInit(): void {
       
        this.authService.user.subscribe(date=>{
           if(!date)
           {
            this.isAuthenticated = false;
            
           }else{
            this.isAuthenticated = true;
            this.userName=date.email; 
           }

        });
        const userData:{
             email:string;
             password:string;
             token:string;
        }=JSON.parse(localStorage.getItem('userData')!);
       
        if(!userData)
        {
            this.isAuthenticated = false;
    
        }else{
            this.isAuthenticated = true;
            this.userName=userData.email;
        }
    
    }

   

    logOut()
    {
           localStorage.removeItem('userData');
           this.isAuthenticated = false;
           this.router.navigate(['/']);
    }
}
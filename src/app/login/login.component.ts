import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName: "",
    password: ""
  };

  constructor(
    private authservice: AuthService
  ) { }

  ngOnInit() {
    
  }


  onLogout(){
    console.log(this.user);
    this.authservice.login(this.user);
  }

}

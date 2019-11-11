import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user'
import { AngularFireAuth } from '@angular/fire/auth';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private db: AngularFireAuth
  ) { }


  login(user: User){
    
    this.db.auth.signInWithEmailAndPassword(user.userName, user.password).then((x)=> {
      console.log(x);
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    })
      .catch((error)=>{
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    /* if (user.userName !== '' && user.password !== '' ) { // {3}
      this.loggedIn.next(true);
      console.log("entrou aqui!");
      this.router.navigate(['/dashboard']);
    } */
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    console.log("entrou aqui!");
    this.router.navigate(['']);
  }
}

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
  private Validation = new BehaviorSubject<String>("");

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  get IsValidation(){
    return this.Validation.asObservable();
  }

  constructor(
    private router: Router,
    private db: AngularFireAuth
  ) { }


  login(user: User){
    
    this.db.auth.signInWithEmailAndPassword(user.userName, user.password).then((x)=> {
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    })
      .catch((error)=>{
        this.Validation.next(error.code);
    });
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    console.log("entrou aqui!");
    this.router.navigate(['']);
  }
}

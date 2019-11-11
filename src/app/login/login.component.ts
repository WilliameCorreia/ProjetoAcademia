import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  private formSubmitAttempt: boolean;
  MessageFireBase: String = ""; 

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.authservice.login(this.form.value);
    }
    this.formSubmitAttempt = true;
    this.authservice.IsValidation.subscribe((message)=>{
      this.MessageFireBase = message;
    }); 
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isInvalid(){
    return (
      (this.MessageFireBase != "")
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNull } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //spiner
  color = 'warn';
  mode = 'indeterminate';
  diameter = 20;

  form: FormGroup;
  private formSubmitAttempt: boolean;
  
  MessageFireBase: String;
  private Spinnerload: boolean;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.MessageFireBase = null;
    this.Spinnerload = false;
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.Spinnerload = true;
    this.MessageFireBase = null;
    if (this.form.valid) {
      this.authservice.login(this.form.value);
  }

    this.formSubmitAttempt = true;

    this.authservice.IsValidation.subscribe((message) => {
      this.MessageFireBase = message;
    });

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isInvalid() {
    return (
      (this.MessageFireBase != null)
    );
  }

  Load() {
    return (this.MessageFireBase == null && this.Spinnerload);
  }

  ClearMsn(){
    if(!isNull(this.MessageFireBase)){
        this.authservice.SetValidation(null);
        this.Spinnerload = false;
      console.log(this.MessageFireBase);  
    }
    
  }

}

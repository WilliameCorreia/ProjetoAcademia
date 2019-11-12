import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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
  MessageFireBase: String = "";

  private load: boolean = false;

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

  onSubmit() {
    
    if (this.form.valid) {
      this.load = true;
      this.authservice.login(this.form.value);
      this.formSubmitAttempt = true;
      this.authservice.IsValidation.subscribe((message) => {  
        this.MessageFireBase = message;
      });
    }

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isInvalid() {
    return (
      (this.MessageFireBase != "")
    );
  }

  Load() {
    return (this.MessageFireBase == "" && this.load);
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  #fb = inject(NonNullableFormBuilder);
  loginSuccess = false;
  #router = inject(Router);
  
  constructor(private fb: FormBuilder) {
    this.loginForm = this.#fb.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }
  
  checkLogin(){
    const {username, password} = this.loginForm.value;
    if(username == "User" && password == "1234"){
      this.loginSuccess = true;
      this.#router.navigate(['/my-list']);
    }
  }
}

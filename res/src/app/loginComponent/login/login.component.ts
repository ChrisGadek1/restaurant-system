import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginFailedComponent } from '../loginFailedDialog/login-failed/login-failed.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private auth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) { }

  loginForm: FormGroup;
  loginError:boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  onSubmit(loginForm){
    this.auth.signInWithEmailAndPassword(this.loginForm.get("email").value, this.loginForm.get("password").value).then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.dialog.open(LoginFailedComponent);
      this.loginError = true;
    })
  }

}

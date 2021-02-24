import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: firebase.default.User;
  constructor(private auth: AngularFireAuth){
    this.auth.user.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  authenticate(){
    return this.user;
  }

  logOut(){
    this.auth.signOut().then(() => {

    })
  }
}

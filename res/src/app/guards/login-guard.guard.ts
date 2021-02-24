import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  
  constructor(private authService: AuthService,private auth: AngularFireAuth, private router: Router){
    
  }
  

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(authState => {
        if (authState) this.router.navigate(['/']);
        return !authState;
      }),
      take(1)
    )
  }
  
}

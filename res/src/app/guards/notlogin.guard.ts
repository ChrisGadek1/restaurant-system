import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotloginGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router){
    
  }

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(authState => {
        if (authState == null) this.router.navigate(['/login']);
        return authState != null;
      }),
      take(1)
    )
  }
  
}

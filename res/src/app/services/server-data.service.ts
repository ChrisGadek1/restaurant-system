import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Basket } from '../objects/Basket/basket';
import { Client } from '../objects/Client/client';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(private afCloud: AngularFirestore, private auth: AngularFireAuth) {
    

    this.auth.user.subscribe((user) => {
      this.user = user;
      if(user != null){
        this.afCloud.collection("/clients", ref => ref.where("email", "==", user.email)).get().subscribe((userData) => {
          this.basket = {
            userID: (<Client>userData.docs[0].data()).ID
          }
          this.afCloud.collection("/baskets").doc(this.basket.userID).get().subscribe(basket => {
            if(basket.data() != undefined) this.basket.dishes = (<Basket>basket.data()).dishes;
          })
        })
      }
    });
  }

  db = this.afCloud.collection("clients").valueChanges();
  basket: Basket;
  user: firebase.default.User;
}

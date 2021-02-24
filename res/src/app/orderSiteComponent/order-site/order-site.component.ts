import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Basket } from 'src/app/objects/Basket/basket';
import { Client } from 'src/app/objects/Client/client';
import { Dish } from 'src/app/objects/Dish/dish';
import { ServerDataService } from 'src/app/services/server-data.service';

@Component({
  selector: 'app-order-site',
  templateUrl: './order-site.component.html',
  styleUrls: ['./order-site.component.css']
})
export class OrderSiteComponent implements OnInit {

  constructor(private afCloud: AngularFirestore, private auth: AngularFireAuth, private serverDate: ServerDataService) {
    this.afCloud.collection("dishes").valueChanges().subscribe((dishes: Dish[]) => {
      this.dishes = dishes;
    });
  }

  dishes: Dish[] = [];

  ngOnInit(): void {
  }

}

import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { element } from 'protractor';
import { Dish } from 'src/app/objects/Dish/dish';
import { ServerDataService } from 'src/app/services/server-data.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit, OnChanges {

  constructor(private auth: AngularFireAuth, private afCloud: AngularFirestore, public serverUpdate: ServerDataService, private renderer: Renderer2) {
    
  }

  @Input()
  dish: Dish;

  @ViewChild('desc') el:ElementRef;

  user: firebase.default.User = undefined;

  expandDesc(){
    
  }

  ngAfterViewInit(){
    
  }

  updateBasket(){
    this.afCloud.collection("/baskets").doc(this.serverUpdate.basket.userID).get().subscribe((basket) => {
      let data = basket.data();
      if(data != null){
        this.afCloud.collection("/baskets").doc(this.serverUpdate.basket.userID).update({dishes: this.serverUpdate.basket.dishes});
      }
      else{
        this.afCloud.collection("/baskets").doc(this.serverUpdate.basket.userID).set(this.serverUpdate.basket);
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    let dish: Dish = changes["dish"].currentValue;
    if(dish != undefined){
      let storage = firebase.default.storage();
      let pathRef = storage.ref('/img/'+dish.photoURL);
      pathRef.getDownloadURL().then((url) => {
        let img = (<HTMLImageElement>document.getElementById("dish-img"+dish.ID));
        img.setAttribute('src', url);
        
      })
    }
  }

  addToBasket(){
    if(this.serverUpdate.basket.dishes != undefined){
      let dish = this.serverUpdate.basket.dishes.find(element => element.dishID == this.dish.ID);
      if(dish != null) dish.number += 1;
      else{
        this.serverUpdate.basket.dishes.push({
          dishID: this.dish.ID,
          price: this.dish.price,
          number: 1
        })
      }
    }
    else{
      this.serverUpdate.basket.dishes = [{
        dishID: this.dish.ID,
        price: this.dish.price,
        number: 1
      }]
    }
    this.updateBasket();
  }

  getNumberOfDishes(){
    if(this.serverUpdate.basket != undefined && this.serverUpdate.basket.dishes != undefined){
      let dish = this.serverUpdate.basket.dishes.find(element => element.dishID == this.dish.ID);
      if(dish == null){
        return 0
      }
      else{
        return dish.number;
      }
    }
    else{
      return "";
    }
  }

  removeFromBasket(){
    if(this.serverUpdate.basket.dishes != undefined){
      let dish = this.serverUpdate.basket.dishes.find(element => element.dishID == this.dish.ID);
      if(dish != null){
        dish.number -= 1;
        if(dish.number == 0){
          this.serverUpdate.basket.dishes = this.serverUpdate.basket.dishes.filter((element) => element.dishID != this.dish.ID);
          
        }
        this.updateBasket();
      }
      
    }
  }


}

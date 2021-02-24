import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Basket } from 'src/app/objects/Basket/basket';
import { ServerDataService } from 'src/app/services/server-data.service';

@Component({
  selector: 'app-basket-site',
  templateUrl: './basket-site.component.html',
  styleUrls: ['./basket-site.component.css']
})
export class BasketSiteComponent implements OnInit {

  constructor(public serverData: ServerDataService) {
    
  }

  ngOnInit(): void {
  }

}

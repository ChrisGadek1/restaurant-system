import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/objects/Client/client';
import { ServerDataService } from 'src/app/services/server-data.service';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {

  constructor(private serverData: ServerDataService, private auth: AngularFireAuth) {
    
  }


  client: Client = undefined;
  email: string = undefined;

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if(user != null){
        this.email = user.email;
        this.serverData.db.subscribe((clients:Client[]) => {
          this.client = clients.filter((value:Client) => {
            return value.email == this.email;
          })[0];
        })
      }
      
    })
    
  }


}

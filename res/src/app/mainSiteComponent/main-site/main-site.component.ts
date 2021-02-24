import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit(): void {
  }

  lat = 50.2660135568372
  lng = 19.617339265170095

  map: google.maps.Map;

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
}

}

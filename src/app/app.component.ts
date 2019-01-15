import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeoCoordinatesService } from 'src/services/geocoordinates.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Map',
      url: '/map',
      icon: 'map'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public geoLocation: Geolocation,
    public geoCoordService: GeoCoordinatesService,
  ) {}

  ngOnInit() {
    this.initializeApp();
    this.initializeLocation();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeLocation() {

    this.geoLocation.getCurrentPosition()
    .then((resp) => {
      console.log('This is initialization');
      // this.coordinates = {latitude: resp.coords.latitude, longitude: resp.coords.longitude};
      this.geoCoordService.setCurrentCoordinates(resp.coords.latitude, resp.coords.longitude);
    })
    .catch((error) => {
      console.log('Error getting position ', error);
    });

    let watch = this.geoLocation.watchPosition()
    .subscribe((resp) => {
      console.log('This is Watch');
      this.geoCoordService.setCurrentCoordinates(resp.coords.latitude, resp.coords.longitude);
    });
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

import { GeoCoordinatesService } from 'src/services/geocoordinates.service';
import { environment } from 'src/environments/environment';
import { Geocoordinates } from 'src/models/geocoordinates.model';
import { Router } from '@angular/router';
import { NavParamService } from 'src/services/navparam.service';
import { PlotService } from 'src/services/plot.service';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {

  platform: any;
  lat: any;
  lng: any;
  map: any;
  coordinates: Geocoordinates;
  plotId: string;
  lnglat: any;

  constructor(public geoCoordService: GeoCoordinatesService,
    private router: Router, public navParamService: NavParamService,
    public plotService: PlotService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {

    this.coordinates = this.geoCoordService.getCurrentCoordinates();

    this.plotId = this.navParamService.plotId;

    if (this.plotId) {

      console.log('<<< Received Plot Id >>> ' + this.plotId);

      const plot = this.plotService.getPlot(this.plotId);

      if (plot) {
      console.log('<<< Plot Details received from database >>>');
      console.log(plot.id + ' - ' + plot.plotName);

      this.lnglat = new mapboxgl.LngLat(plot.plotLongitude, plot.plotLatitude);

    } else {

      console.log('<<< Coordinates from Geelocation >>> ' + this.coordinates.latitude.toPrecision(4));
      console.log('<<< Coordinates from Geelocation >>> ' + this.coordinates.longitude.toPrecision(4));

      this.lnglat = new mapboxgl.LngLat(this.coordinates.longitude, this.coordinates.latitude);

    }
  } else  {

    // this.coordinates = this.geoCoordService.getCurrentCoordinates();
    console.log('<<< Coordinates from Geelocation >>> ' + this.coordinates.latitude.toPrecision(4));
    console.log('<<< Coordinates from Geelocation >>> ' + this.coordinates.longitude.toPrecision(4));

    // this.lat = parseInt(this.coordinates.latitude.toPrecision(4), 10);
    // this.lng = parseInt(this.coordinates.longitude.toPrecision(4), 10);
    this.lnglat = new mapboxgl.LngLat(this.coordinates.longitude, this.coordinates.latitude);

    }

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.lnglat,
      zoom: 15,
    });

    // const marker = new mapboxgl.Marker()
    // .setLngLat(this.lnglat)
    // .addTo(this.map);

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    }));


    this.map.on('load', () => {
      this.map.resize();
    });

  }

  toggleSat() {
    this.map.setStyle('mapbox://styles/mapbox/satellite-streets-v9');
  }

  toggleStreets() {
    this.map.setStyle('mapbox://styles/mapbox/streets-v9');
  }

  onPinDrop() {

    const currentCoords = this.geoCoordService.getCurrentCoordinates();

    const pinMarker = new mapboxgl.Marker()
    .setLngLat([currentCoords.longitude, currentCoords.latitude])
    .addTo(this.map);

  }

  onStopPlotting() {

    let img = this.map.getCanvas().toDataURL();

  }

  // async showAlert(img: any) {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Plot Tagged',
  //     message: '',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

import { GeoCoordinatesService } from 'src/services/geocoordinates.service';
import { environment } from 'src/environments/environment';
import { Geocoordinates } from 'src/models/geocoordinates.model';
import { Router } from '@angular/router';
import { NavParamService } from 'src/services/navparam.service';
import { PlotService } from 'src/services/plot.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import 'rxjs/add/observable/interval';
import { Observable, Subscription } from 'rxjs';

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

  childPlotId: string;
  changingPosition = new Subscription();
  coordinatesList: any = [];
  turfArea: any;
  geolocate: any;

  constructor(public geoCoordService: GeoCoordinatesService,
    private router: Router, public navParamService: NavParamService,
    public plotService: PlotService, public geolocation: Geolocation) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {

    this.coordinates = this.geoCoordService.getCurrentCoordinates();

    this.plotId = this.navParamService.plotId;
    this.childPlotId = this.navParamService.childPlotId;

    if (this.childPlotId) {

      console.log('<<< Received Plot Id >>> ' + this.childPlotId);

      const childPlot = this.plotService.getChildPlot(this.childPlotId);

      if (childPlot) {
      console.log('<<< Plot Details received from database >>>');
      console.log(childPlot.id + ' - ' + childPlot.plotName);

      this.lnglat = new mapboxgl.LngLat(childPlot.plotLongitude, childPlot.plotLatitude);

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

    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    this.map.addControl(this.geolocate);


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

    // const currentCoords = this.geoCoordService.getCurrentCoordinates();

    this.geolocate._geolocateButton.click();

    this.changingPosition = Observable.interval(5000)
    .subscribe(() => {

      const userlocation = this.geolocate._lastKnownPosition;

      console.log(userlocation);

      console.log(userlocation.coords.latitude);
      console.log(userlocation.coords.longitude);

      this.coordinatesList.push([userlocation.coords.longitude, userlocation.coords.latitude]);
      /**
      const coords = this.geoCoordService.getCurrentCoordinates();

      console.log(coords.latitude + ' - ' + coords.longitude);

      const updatedlngLat = new mapboxgl.LngLat(coords.longitude, coords.latitude);

      const marker = new mapboxgl.Marker()
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(this.map);

      this.coordinatesList.push([coords.longitude, coords.latitude]);
      */
      // console.log('called');
    });
    // const pinMarker = new mapboxgl.Marker()
    // .setLngLat([currentCoords.longitude, currentCoords.latitude])
    // .addTo(this.map);

  }

  onStopPlotting() {
    this.geolocate._geolocateButton.click();
    this.changingPosition.unsubscribe();
    // this.coordinatesList.forEach(childList => {
    //   console.log(childList);
    // });
    console.log(this.coordinatesList);

    this.map.addLayer({
      'id': 'plot',
      'type': 'fill',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [this.coordinatesList]
          }
        }
      },
      'layout': {},
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }
    });

    // tslint:disable-next-line:max-line-length
    const turfPolygon = turf.polygon([this.coordinatesList]);

    this.turfArea = turf.area(turfPolygon);

    console.log('Calculated Area >>> ' + this.turfArea);

    const childPlot = this.plotService.getChildPlot(this.childPlotId);

    this.plotService.updateChildPlot(this.childPlotId, this.coordinatesList, this.turfArea);

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

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

  screenshot: any;

  constructor(public geoCoordService: GeoCoordinatesService,
    private router: Router, public navParamService: NavParamService,
    public plotService: PlotService, public geolocation: Geolocation,
    private routeCtrl: Router) {
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
      preserveDrawingBuffer: true
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
    // this.geolocate.trigger();

    this.changingPosition = Observable.interval(1000)
    .subscribe(() => {

      const userlocation = this.geolocate._lastKnownPosition;

      console.log(userlocation);

      console.log(userlocation.coords.latitude);
      console.log(userlocation.coords.longitude);

      this.coordinatesList.push([userlocation.coords.longitude, userlocation.coords.latitude]);

    });
  }

  onStopPlotting() {
    this.geolocate._geolocateButton.click();
    this.changingPosition.unsubscribe();
    console.log(this.coordinatesList);

    this.map.addLayer({
      'id': Math.random().toString(36).substring(7),
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

    this.screenshot = this.map.getCanvas().toDataURL();

    console.log(this.screenshot);

    // const imgBlob = this.dataURItoBlob(this.screenshot);

    // const imgFile = new File([imgBlob], this.childPlotId + '.png', {
    //   type: 'image/png',
    // });

    // console.log(imgFile.name);
    // console.log(imgFile.size);

    // $('#mapscreenshot').append();
    // tslint:disable-next-line:max-line-length
    const turfPolygon = turf.polygon([this.coordinatesList]);

    this.turfArea = turf.area(turfPolygon);

    console.log('Calculated Area >>> ' + this.turfArea);

    // const childPlot = this.plotService.getChildPlot(this.childPlotId);

    this.plotService.updateChildPlot(this.childPlotId, this.coordinatesList, this.turfArea, this.screenshot);

    this.navParamService.plotId = this.plotId;
    this.routeCtrl.navigate(['/plotdetails']);
  }

  // async showAlert(img: any) {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Plot Tagged',
  //     message: '',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

   dataURItoBlob(dataURI) {

    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
      }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}

}

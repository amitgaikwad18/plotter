import { Component, OnInit } from '@angular/core';

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

    this.plotId = this.navParamService.plotId;
    console.log(this.plotId);

    this.coordinates = this.geoCoordService.getCurrentCoordinates();

    if (null !== this.plotId) {
      const plot = this.plotService.getPlot(this.plotId);
      console.log(plot.plotName);

      this.lnglat = new mapboxgl.LngLat(plot.plotLongitude, plot.plotLatitude);

    } else {

    // this.coordinates = this.geoCoordService.getCurrentCoordinates();
    console.log('Coordinates from Geotag >>> ' + this.coordinates.latitude.toPrecision(4));
    console.log('Coordinates from Geotag >>> ' + this.coordinates.longitude.toPrecision(4));

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

    const marker = new mapboxgl.Marker()
    .setLngLat(this.lnglat)
    .addTo(this.map);

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
}

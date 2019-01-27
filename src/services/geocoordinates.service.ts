import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Geocoordinates } from '../models/geocoordinates.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({providedIn: 'root'})
export class GeoCoordinatesService {

    private coordinates: Geocoordinates;
    private coords: Geocoordinates[] = [];

    private coordsUpdated = new Subject<Geocoordinates[]>();

    constructor(public geoLocation: Geolocation) {}

    getCurrentCoordinates() {
        return this.coordinates;
    }

    getChangedPosition() {
        return this.coordsUpdated.asObservable();
    }

    setCurrentCoordinates(lat: any, lng: any) {
        const coordinates = {latitude: lat, longitude: lng};
        this.coordinates = coordinates;
        return this.coordinates;
    }
}

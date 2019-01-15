import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Geocoordinates } from '../models/geocoordinates.model';

@Injectable({providedIn: 'root'})
export class GeoCoordinatesService {

    private coordinates: Geocoordinates;
    private coords: Geocoordinates[] = [];

    private coordsUpdated = new Subject<Geocoordinates[]>();

    getCurrentCoordinates() {
        return this.coordinates;
    }

    setCurrentCoordinates(lat: any, lng: any) {
        const coordinates = {latitude: lat, longitude: lng};
        this.coordinates = coordinates;
        return this.coordinates;
    }
}

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Plot } from '../models/plot.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({providedIn: 'root'})
export class PlotService {

    private plots: Plot[] = [];
    private plotsAdded = new Subject<Plot[]>();

    constructor(private httpClient: HttpClient) {}

    getPlots() {
        this.httpClient
        .get<{message: string, plots: any}>(environment.app_url + '/api/plots')
        .pipe(map((plotData) => {
            return plotData.plots.map((plot) => {
                return {
                    id: plot._id,
                    plotName: plot.plotName,
                    plotLatitude: plot.plotLatitude,
                    plotLongitude: plot.plotLongitude,
                };
            });
        }))
        .subscribe((transformedPlots) => {
            this.plots = transformedPlots;
            this.plotsAdded.next([...this.plots]);
        });

    }

    getPlot(id: string) {
        return {...this.plots.find(plot => plot.id === id)};
    }

    getPlotsAddListener() {
       return this.plotsAdded.asObservable();
    }

    addPlot(plotName: string) {
        const plot: Plot = {id: null, plotName: plotName, plotLatitude: null, plotLongitude: null};
        this.httpClient.post<{message: string, plotId: string }>(environment.app_url + '/api/plots', plot)
        .subscribe((responseData) => {
            plot.id = responseData.plotId;
            this.plots.push(plot);
            this.plotsAdded.next([...this.plots]);
        });

    }

    deletePlot(plotId: string) {
        this.httpClient
        .delete(environment.app_url + '/api/plots/' + plotId)
        .subscribe(() => {
            console.log('Plot Deleted');
            const updatedPlots = this.plots.filter(plot => plot.id !== plotId);
            this.plots = updatedPlots;
            this.plotsAdded.next([...this.plots]);
        });
    }

    geoTagPlot(plotId: string, plotLat: number, plotLong: number) {
        // const updatedPlot: Plot = {
        //     id: plot.id,
        //     plotName: plot.plotName,
        //     plotLatitude: plotLat,
        //     plotLongitude: plotLong
        // };
        const updatedPlot = this.plots.find(plot => plot.id === plotId);
        updatedPlot.plotLatitude = plotLat;
        updatedPlot.plotLongitude = plotLong;
        this.httpClient
        .put<{message: string, plotId: string}>
        (environment.app_url + '/api/plots/' + plotId, updatedPlot)
        .subscribe(() => {
            console.log('Plot updated successfully');
        });
    }

}

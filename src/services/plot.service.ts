import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Plot } from '../models/plot.model';
import { environment } from 'src/environments/environment.prod';
import { ChildPlot } from 'src/models/childplot.model';

@Injectable({providedIn: 'root'})
export class PlotService {

    private plots: Plot[] = [];
    private plotsAdded = new Subject<Plot[]>();

    private childPlots: ChildPlot[] = [];
    private childPlotAdded = new Subject<ChildPlot[]>();

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

    getChildPlots(parentPlotId: string) {

        this.httpClient
        .get<{message: string, childplots: any}>(environment.app_url + '/api/childplots/' + parentPlotId)
        .pipe(map((responseData) => {
            return responseData.childplots.map((childPlot) => {

                return {
                    id: childPlot._id,
                    plotName: childPlot.plotName,
                    parentPlotId: childPlot.parentPlotId,
                    plotLatitude: childPlot.plotLatitude,
                    plotLongitude: childPlot.plotLongitude,
                    plotPolygon: childPlot.plotPolygon,
                    plotarea: childPlot.plotArea,
                };
            });
        }))
        .subscribe((changedChildPlots) => {
            this.childPlots = changedChildPlots;
            return this.childPlotAdded.next([...this.childPlots]);
        });
    }

    getChildplotsListener() {
        return this.childPlotAdded.asObservable();
    }

    getChildPlot(id: string) {
        return {...this.childPlots.find(childPlot => childPlot.id === id)};
    }

    addChildPlot(plotName: string, parentPlotId: string, plotLatitude: number, plotLongitude: number) {

        console.log('<<< addChildPlot >>> ');
        console.log(plotName);
        console.log(parentPlotId);
        console.log(plotLatitude);
        console.log(plotLongitude);

        const newChildPlot: ChildPlot = {
            id: null,
            plotName: plotName,
            parentPlotId: parentPlotId,
            plotLatitude: plotLatitude,
            plotLongitude: plotLongitude,
            plotArea: null,
            plotPolygon: null,
            plotImgData: null
        };
        this.httpClient
        .post<{message: string, childPlotId: string}>(environment.app_url + '/api/childplot', newChildPlot)
        .subscribe((responseData) => {
            newChildPlot.id = responseData.childPlotId;
            console.log('New Child ID >>> ' + newChildPlot.id);
            this.childPlots.push(newChildPlot);
            this.childPlotAdded.next([...this.childPlots]);
        });
    }

    deleteChildPlot(plotId: string) {
        this.httpClient
        .delete(environment.app_url + '/api/childplots/' + plotId)
        .subscribe(() => {
            console.log('Plot Deleted');
            const updatedPlots = this.childPlots.filter(childPlot => childPlot.id !== plotId);
            this.childPlots = updatedPlots;
            this.childPlotAdded.next([...this.childPlots]);
        });
    }

    updateChildPlot(plotId: string, plotPolygon: string[], plotArea: number, plotImgData: string) {

        const updatedChildPlot = this.childPlots.find(childPlot => childPlot.id === plotId);
        updatedChildPlot.plotPolygon = plotPolygon;
        updatedChildPlot.plotArea = plotArea;
        updatedChildPlot.plotImgData = plotImgData;
        this.httpClient
        .put<{message: string, plotId: string}>(environment.app_url + '/api/childplots/' + plotId, updatedChildPlot)
        .subscribe(() => {
            console.log('Plot updated successfully');
        });
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plot } from '../../../models/plot.model';
import { Subscription } from 'rxjs';
import { PlotService } from '../../../services/plot.service';

import { Router } from '@angular/router';
import { GeoCoordinatesService } from '../../../services/geocoordinates.service';
import { NavParamService } from 'src/services/navparam.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-plots-list',
  templateUrl: './plots-list.component.html',
  styleUrls: ['./plots-list.component.scss']
})
export class PlotsListComponent implements OnInit, OnDestroy {

  // currentCoords: any;

  private plot: Plot;

  plots: Plot[] = [];
  private plotsSub: Subscription;

  constructor(public plotsService: PlotService,
    public geoService: GeoCoordinatesService,
    private routeCtrl: Router,
    public navParamService: NavParamService,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.initializePlots();
  }

  initializePlots() {
    this.plotsService.getPlots();
    this.plotsSub = this.plotsService.getPlotsAddListener()
    .subscribe((plots: Plot[]) => {
      this.plots = plots;
    });
  }

  deletePlot(plotId: string) {
    this.plotsService.deletePlot(plotId);
  }

  onAddPlot(plotId: any) {

    // this.viewCtrl.dismiss();
    // this.appCtrl.getRootNav().push(MapPage, {id: plotId});
    this.navParamService.plotId = plotId;

    const plotToUpdate = this.plotsService.getPlot(plotId);
    console.log(plotToUpdate.plotLatitude);
    if ( !plotToUpdate.plotLatitude && !plotToUpdate.plotLongitude) {
      this.showAlert();
    } else {
      this.routeCtrl.navigate(['/map']);
    }

    // this.events.publish('tag:plot', plotId);
    // this.navService.plotId = plotId;
    // this.router.navigateByUrl('/tabs/geo-tag', plotId);
    // await this.navControl.push(MapPage, {id: plotId});
    // this.navControl.navigateForward('/tabs/geo-tag/:plotId', plotId);
  }

  ngOnDestroy() {
    this.plotsSub.unsubscribe();
  }

  onTagPlot(plotId: string) {

    this.plot = this.plotsService.getPlot(plotId);

    const currentCoords = this.geoService.getCurrentCoordinates();

    this.plotsService.geoTagPlot(plotId, currentCoords.latitude, currentCoords.longitude);

    this.showPlotTagAlert(currentCoords.latitude.toPrecision(4), currentCoords.longitude.toPrecision(4));


  }

  onViewInfo(plotId: string) {

    console.log('Plot Details requested >>> ' + plotId);
  this.navParamService.plotId = plotId;
  this.routeCtrl.navigate(['/plotdetails']);

  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Warning!',
      message: 'Missing Coordinates. Please click on Tag button.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showPlotTagAlert(plotLatitude: any, plotLongitude: any) {
    const alert = await this.alertCtrl.create({
      header: 'Plot Tagged',
      message: 'Your plot has been tagged at Latitude: ' + plotLatitude + ', Longitude: ' + plotLongitude,
      buttons: ['OK']
    });

    await alert.present();
  }

  getPlots(searchInput: any) {

    // Reinitializing all plots
    // this.plotsService.getPlots();

    const searchVal = searchInput.target.value;

    if (!searchVal) {
      return;
    }

  //  if (searchVal && searchVal.trim() !== '')  {

     this.plots = this.plots.filter((plot) => {

      if ( plot.plotName && searchVal) {

        if (plot.plotName.toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      }
    });
  }
}

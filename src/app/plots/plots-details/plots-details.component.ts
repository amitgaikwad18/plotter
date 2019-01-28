import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Plot } from '../../../models/plot.model';
import { NavParamService } from '../../../services/navparam.service';
import { PlotService } from '../../../services/plot.service';
import { ChildPlot } from 'src/models/childplot.model';
import { GeoCoordinatesService } from 'src/services/geocoordinates.service';
import { Subscription } from 'rxjs';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { PlotsCreateComponent } from '../plots-create/plots-create.component';
import { PlotsChildComponent } from '../plots-child/plots-child.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plots-details',
  templateUrl: './plots-details.component.html',
  styleUrls: ['./plots-details.component.scss']
})
export class PlotsDetailsComponent implements OnInit {

  plotId: any;
  plot: Plot;

  childPlots: ChildPlot[] = [];
  private childPlotsSub = new Subscription;

  map: any;
  mapImg: any;

  imageURI: any;
  imageFileName: any;

  modal: any;

  constructor(public navParamService: NavParamService, private plotService: PlotService,
    public geoCoordinateService: GeoCoordinatesService, public modalCtrl: ModalController,
    public router: Router) {
      mapboxgl.accessToken = environment.mapbox.accessToken;
    }

  ngOnInit() {

    console.log('<<< This is details >>>');
    this.plotId = this.navParamService.plotId;

    console.log('<<< Details Requested for >>>> '  + this.plotId);

    this.plot = this.plotService.getPlot(this.plotId);

    this.initializeChildPlots(this.plot.id);

  }

  initializeChildPlots(plotId: string) {

    console.log('Childs for ' + plotId);

    this.plotService.getChildPlots(plotId);
    this.childPlotsSub = this.plotService.getChildplotsListener()
    .subscribe((childPlots: ChildPlot[]) => {
      this.childPlots = childPlots;
    });
    }

  onPlot(childId: string) {

    this.navParamService.childPlotId = childId;
    this.router.navigate(['map']);

  }

  // async onTag() {

  //   this.modal = await this.modalCtrl.create({
  //     component: PlotsChildComponent,
  //     componentProps: { plotId: this.plotId }
  //   });
  //   return await this.modal.present();
  // }

  onTag(plotId: string) {
    this.navParamService.plotId = plotId;
    this.router.navigate(['plotaddchild']);
  }

  deleteChildPlots(childPlotId: string) {
    this.plotService.deleteChildPlot(childPlotId);
  }

}

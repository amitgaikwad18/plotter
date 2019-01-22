import { Component, OnInit } from '@angular/core';
import { Plot } from '../../../models/plot.model';
import { NavParamService } from '../../../services/navparam.service';
import { PlotService } from '../../../services/plot.service';
import { PopoverController } from '@ionic/angular';
import { ChildPlot } from 'src/models/childplot.model';
import { GeoCoordinatesService } from 'src/services/geocoordinates.service';

@Component({
  selector: 'app-plots-details',
  templateUrl: './plots-details.component.html',
  styleUrls: ['./plots-details.component.scss']
})
export class PlotsDetailsComponent implements OnInit {

  plotId: any;
  plot: Plot;

  childPlots: ChildPlot[] = [];

  constructor(public navParamService: NavParamService, private plotService: PlotService,
    public geoCoordinateService: GeoCoordinatesService) { }

  ngOnInit() {

    console.log('<<< This is details >>>');
    this.plotId = this.navParamService.plotId;

    console.log('<<< Details Requested for >>>> '  + this.plotId);

    this.plot = this.plotService.getPlot(this.plotId);

    // this.plotService.getChildPlots(this.plotId);
  }

  onTagPlot(parentPlotId: string) {

    console.log('Tagging Plot');

    const coords = this.geoCoordinateService.getCurrentCoordinates();

    console.log('<<< onTagPlot >>> ');
    console.log(parentPlotId);
    console.log(coords.latitude);
    console.log(coords.longitude);

    this.plotService.addChildPlot(parentPlotId, coords.latitude, coords.longitude);
  }



}

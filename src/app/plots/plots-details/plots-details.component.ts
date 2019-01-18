import { Component, OnInit } from '@angular/core';
import { Plot } from '../../../models/plot.model';
import { NavParamService } from '../../../services/navparam.service';
import { PlotService } from '../../../services/plot.service';

@Component({
  selector: 'app-plots-details',
  templateUrl: './plots-details.component.html',
  styleUrls: ['./plots-details.component.scss']
})
export class PlotsDetailsComponent implements OnInit {

  plotId: any;
  plot: Plot;

  constructor(public navParamService: NavParamService, private plotService: PlotService) { }

  ngOnInit() {

    this.plotId = this.navParamService.plotId;

    this.plot = this.plotService.getPlot(this.plotId);


  }

}

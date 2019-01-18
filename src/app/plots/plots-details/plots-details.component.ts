import { Component, OnInit } from '@angular/core';
import { Plot } from '../../../models/plot.model';
import { NavParamService } from '../../../services/navparam.service';
import { PlotService } from '../../../services/plot.service';

import { PopoverController } from '@ionic/angular';
import { MoreMenuPopover } from './plot-details.popover.component';


@Component({
  selector: 'app-plots-details',
  templateUrl: './plots-details.component.html',
  styleUrls: ['./plots-details.component.scss']
})
export class PlotsDetailsComponent implements OnInit {

  plotId: any;
  plot: Plot;

  constructor(public navParamService: NavParamService, private plotService: PlotService, public popoverCtrl: PopoverController) { }

  ngOnInit() {

    console.log('<<< This is details >>>');
    this.plotId = this.navParamService.plotId;

    console.log('<<< Details Requested for >>>> '  + this.plotId);

    this.plot = this.plotService.getPlot(this.plotId);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: MoreMenuPopover,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}

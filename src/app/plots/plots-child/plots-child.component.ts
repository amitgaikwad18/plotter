import { Component, OnInit, Input } from '@angular/core';
import { PlotService } from 'src/services/plot.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { GeoCoordinatesService } from 'src/services/geocoordinates.service';
import { NavParamService } from 'src/services/navparam.service';

@Component({
  selector: 'app-plots-child',
  templateUrl: './plots-child.component.html',
  styleUrls: ['./plots-child.component.scss']
})
export class PlotsChildComponent implements OnInit {

  constructor(public plotService: PlotService, private routeCtrl: Router,
    public geoCoordinateService: GeoCoordinatesService,
    public navParamsService: NavParamService) { }

  // @Input() plotId: string;

  // plotName: string;
  childPlotForm = new FormGroup({
    plotName: new FormControl('')
  });

  ngOnInit() {
  }

  onAddPlot() {

    const plotId = this.navParamsService.plotId;
    const plotname = this.childPlotForm.get('plotName').value;

    console.log('Plotname' + plotname);
    console.log('Tagging Plot');

    const coords = this.geoCoordinateService.getCurrentCoordinates();

    console.log('<<< onTagPlot >>> ');
    console.log(plotId);
    console.log(coords.latitude);
    console.log(coords.longitude);

    this.plotService.addChildPlot(plotname, plotId, coords.latitude, coords.longitude);
    this.childPlotForm.reset();
    this.routeCtrl.navigate(['plotdetails']);
  }

}

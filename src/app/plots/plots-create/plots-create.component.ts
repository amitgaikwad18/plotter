import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { PlotService } from '../../../services/plot.service';
import { PlotValidator } from './plots.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plots-create',
  templateUrl: './plots-create.component.html',
  styleUrls: ['./plots-create.component.scss']
})
export class PlotsCreateComponent implements OnInit {

  constructor(public plotService: PlotService, private routeCtrl: Router) { }

  validation_messages = {
    'plotName': [
      {type: 'required', message: 'Please enter Plot Name'}
    ]
  };

  // plotName: string;
  plotForm = new FormGroup({
    plotName: new FormControl('', Validators.compose([
      PlotValidator.validPlotname,
      Validators.required,
    ])
    ),
  });

  ngOnInit() {
  }

  onAddPlot() {

    this.plotService.addPlot(this.plotForm.get('plotName').value);
    this.plotForm.reset();
    this.routeCtrl.navigate(['home']);
  }

  goToHome() {
    this.routeCtrl.navigate(['home']);
  }

}

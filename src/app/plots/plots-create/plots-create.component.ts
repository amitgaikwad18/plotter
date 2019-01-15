import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlotService } from '../../../services/plot.service';

@Component({
  selector: 'app-plots-create',
  templateUrl: './plots-create.component.html',
  styleUrls: ['./plots-create.component.scss']
})
export class PlotsCreateComponent implements OnInit {

  constructor(public plotService: PlotService) { }

  plotName: string;

  ngOnInit() {
  }

  onAddPlot(form: NgForm) {

    // if (form.invalid) {
    //   return;
    // }

    console.log(this.plotName);
    this.plotService.addPlot(this.plotName);
    // form.resetForm();
  }

}

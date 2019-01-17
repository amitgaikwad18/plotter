import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private routeCtrl: Router) {}

  addPlot() {

    this.routeCtrl.navigate(['create']);
  }

}

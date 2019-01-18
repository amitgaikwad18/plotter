import { NgModule } from '@angular/core';
import { PlotsDetailsComponent } from './plots-details.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotPopOverPage } from './plot-popover.component';


@NgModule({
    declarations: [ PlotsDetailsComponent, PlotPopOverPage ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [ PlotsDetailsComponent, PlotPopOverPage ],
})

export class PlotsDetailsModule {}

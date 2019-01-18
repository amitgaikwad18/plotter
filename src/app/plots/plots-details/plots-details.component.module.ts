import { NgModule } from '@angular/core';
import { PlotsDetailsComponent } from './plots-details.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ PlotsDetailsComponent ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [ PlotsDetailsComponent ],
})

export class PlotsDetailsModule {}

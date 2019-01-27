import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotsChildComponent } from './plots-child.component';


@NgModule({
    declarations: [ PlotsChildComponent ],
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        // IonicPageModule.forChild(PlotsCreateComponent),
        // RouterModule.forChild([{ path: '', component: PlotsCreateComponent }])
    ],
    exports: [ PlotsChildComponent ],
})

export class PlotsChildModule {}

import { NgModule } from '@angular/core';
import { PlotsListComponent } from './plots-list.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ PlotsListComponent ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        // IonicPageModule.forChild(PlotsCreateComponent),
        // RouterModule.forChild([{ path: '', component: PlotsCreateComponent }])
    ],
    exports: [ PlotsListComponent ],
})

export class PlotsListModule {}

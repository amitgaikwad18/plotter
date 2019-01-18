import { Component } from '@angular/core';
import { ViewController } from '@ionic/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-menu-popover',
    template: '<ion-list><ion-button><ion-icon name="trash"></ion-icon>Delete</ion-button></ion-list>'
})

export class MoreMenuPopover {

    constructor(public viewCtrl: ViewController, public popoverCtrl: PopoverController) {}

    close() {

        this.popoverCtrl.dismiss();
    }
}

import { Component } from '@angular/core';
import { ViewController } from '@ionic/core';

@Component({
    template: '<ion-list><ion-button><ion-icon name="trash"></ion-icon>DELETE</ion-button></ion-list>'
})
export class PlotPopOverPage {

    constructor(public viewCtrl: ViewController) {}

    close() {
        this.viewCtrl._destroy();
    }

}


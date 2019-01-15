import { FormControl } from '@angular/forms';


export class PlotValidator {

    static validPlotname(plotName: FormControl) {
        if (!plotName.value) {
            return ({validPlotname: false});
        } else {
            return (null);
        }
    }
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NavParamService {

    public plotId: string;
    public childPlotId: string;
}

export interface ChildPlot {
    id: string;
    plotName: string;
    parentPlotId: string;
    plotLongitude: number;
    plotLatitude: number;
    plotPolygon: string[];
    plotArea: number;
    plotImgData: string;
}

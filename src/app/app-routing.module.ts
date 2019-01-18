import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlotsCreateComponent } from './plots/plots-create/plots-create.component';
import { PlotsDetailsComponent } from './plots/plots-details/plots-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'map',
    loadChildren: './map/map.module#MapPageModule'
  },
  {
    path: 'create',
    component: PlotsCreateComponent
  },
  {
    path: 'plotdetails',
    component: PlotsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RosComponent } from './ros.component';

const routes: Routes = [
    { path: '', component: RosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RosRoutingModule { }
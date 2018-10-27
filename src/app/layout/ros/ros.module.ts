import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosComponent } from './ros.component';
import { RosRoutingModule } from './ros-routing.module';
import { MatButtonModule, MatIconModule, MatCardModule, MatChipsModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RosRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  declarations: [RosComponent]
})
export class RosModule { }

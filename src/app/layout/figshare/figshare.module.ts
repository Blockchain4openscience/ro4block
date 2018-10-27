import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FigshareRoutingModule } from './figshare-routing.module';
import { FigshareComponent } from './figshare.component';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FigshareRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [FigshareComponent]
})
export class FigshareModule { }

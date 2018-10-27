import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshareRoutingModule } from './slideshare-routing.module';
import { SlideshareComponent } from './slideshare.component';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SlideshareRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [SlideshareComponent]
})
export class SlideshareModule { }

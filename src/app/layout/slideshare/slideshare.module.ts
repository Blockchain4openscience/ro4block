import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshareRoutingModule } from './slideshare-routing.module';
import { SlideshareComponent } from './slideshare.component';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SlideshareRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [SlideshareComponent]
})
export class SlideshareModule { }

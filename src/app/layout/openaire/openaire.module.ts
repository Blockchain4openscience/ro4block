import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenaireComponent } from './openaire.component';
import { OpenaireRoutingModule } from './openaire-routing.module';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    OpenaireRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [OpenaireComponent]
})
export class OpenaireModule { }

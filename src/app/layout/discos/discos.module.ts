import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscosComponent } from './discos.component';
import { DiscosRoutingModule } from './discos-routing.module';
import { MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DiscosRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [DiscosComponent]
})
export class DiscosModule { }

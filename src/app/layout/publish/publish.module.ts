import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish.component';
import { PublishRoutingModule } from './publish-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PublishRoutingModule
  ],
  declarations: [PublishComponent]
})
export class PublishModule { }

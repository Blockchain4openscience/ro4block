import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubComponent } from './github.component';
import { GithubRoutingModule } from './github-routing.module';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    GithubRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [GithubComponent]
})
export class GithubModule { }

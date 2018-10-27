import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'publish', loadChildren: './publish/publish.module#PublishModule' },
            { path: 'search', loadChildren: './search/search.module#SearchModule' },
            { path: 'research_obj', loadChildren: './ros/ros.module#RosModule' },
            { path: 'discos', loadChildren: './discos/discos.module#DiscosModule' },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
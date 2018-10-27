import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [
	{
		path: '', component: SearchComponent,
		children: [
			{ path: 'github', loadChildren: '../github/github.module#GithubModule' },
			{ path: 'openaire', loadChildren: '../openaire/openaire.module#OpenaireModule' },
			{ path: 'share', loadChildren: '../share/share.module#ShareModule' },
			{ path: 'slideshare', loadChildren: '../slideshare/slideshare.module#SlideshareModule' },
			{ path: 'figshare', loadChildren: '../figshare/figshare.module#FigshareModule' },
			{ path: '**', redirectTo: 'github' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SearchRoutingModule { }
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavRightComponent } from '../shared/components/sidenav-right/sidenav-right.component';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	isExpanded = true;
	@ViewChild(SidenavRightComponent) child: SidenavRightComponent;
	constructor(public router: Router) { }

	ngOnInit() {
		if (this.router.url === '/') {
			this.router.navigate(['/dashboard']);
		}
	}

	setExpanded(expand: boolean) {
		console.log(this.isExpanded);
		this.isExpanded = !this.isExpanded;
		this.child.setExpandedRight(expand);
	}
}

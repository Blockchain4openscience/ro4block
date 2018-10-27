import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';


@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	constructor(private matIconRegistry: MatIconRegistry,
				private domSanitizer: DomSanitizer,
				private router: Router) {
		this.matIconRegistry.addSvgIcon("github",
		this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/github.svg"));
		this.matIconRegistry.addSvgIcon("share_research",
		this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/share.svg"));
		this.matIconRegistry.addSvgIcon("openaire",
		this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/openaire.svg"));
		this.matIconRegistry.addSvgIcon("slideshare",
		this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/slideshare.svg"));
		this.matIconRegistry.addSvgIcon("figshare",
		this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/figshare.svg"));
	}

	ngOnInit() {
		if (this.router.url === '/') {
			this.router.navigate(['/github']);
		}
	}

	route(path : string) : void {

		switch(path){
		  case 'github':{
			this.router.navigate(['home/search/github']);
			break;
		  }
		  case 'share':{
			this.router.navigate(['home/search/share']);
			break;
		  }
		  case 'openaire':{
			this.router.navigate(['home/search/openaire']);
			break;
		  }
		  case 'slideshare':{
			this.router.navigate(['home/search/slideshare']);
			break;
		  }
		  case 'figshare':{
			this.router.navigate(['home/search/figshare']);
			break;
		  }
		}
	  }



}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { StorageService } from '../../services/storage/storage.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [StorageService]
})
export class HeaderComponent implements OnInit {
	@Output() someEvent = new EventEmitter<boolean>();
	userName : string;

	constructor(private matIconRegistry: MatIconRegistry,
				private domSanitizer: DomSanitizer,
				private storageService: StorageService) {
		this.matIconRegistry.addSvgIcon("wallet",
		this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/wallet.svg"));
	}

	ngOnInit() {
		let user = this.storageService.read<Object>('user');
		this.userName = user['firstName'] + ' ' +  user['lastName'];
	}

	onLoggedout() {
		localStorage.removeItem('slideshareRepos');
		localStorage.removeItem('figshareRepos');
        localStorage.removeItem('githubRepos');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('user');
	}

	setExpanded() {
		this.someEvent.next(true);
	}
	
}

import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage/storage.service';
import { ROService } from '../../shared/services/ro/ro.service';
import { DiSCOService } from '../../shared/services/disco/disco.service';

@Component({
	selector: 'app-discos',
	templateUrl: './discos.component.html',
	styleUrls: ['./discos.component.scss'],
	providers: [StorageService, ROService, DiSCOService]
})
export class DiscosComponent implements OnInit {

	user: Object;
    searching: boolean = true;
    options: Object = {};
	private Robjs: Array<any> = [];
	private collectRobjs: Array<any> = [];
	private discos: Array<any> = [];
	private collectDiscos: Array<any> = [];

	constructor(private roService: ROService,
				private storageService: StorageService,
				private discoService: DiSCOService) { }

	async ngOnInit() {
		this.user = this.storageService.read<Object>('user');
		await this.roService.mineCollected(this.user['researcherId']).then(collectRobjs => {
			this.collectRobjs = collectRobjs;
			console.log(this.collectRobjs);
		})
		.then(async () =>{
			await this.roService.mineClaimed(this.user['researcherId']).then(Robjs => {
				this.Robjs = Robjs;
				console.log(this.Robjs);
			})
		});
		
		await this.discoService.mine(this.user['researcherId']).then(discos => {
			let titles: string = "";
			this.discos = discos;
			for (let i = 0; i < discos.length; i++) {
				for (let j = 0; j < discos[i]['Robjs'].length; j++) {
					titles += discos[i]['researchObjs'][j].substring(discos[i]['researchObjs'][j].indexOf("#") + 1, discos[i]['researchObjs'][j].length) + "|";
				}
				this.discos[i]['titles'] = titles;
				this.discos[i]['operation'] = "Owner";
				titles = "";
			}
			this.searching = false;
		});

		await this.discoService.mineCollected(this.user['researcherId']).then(discos => {
			let titles: string = "";
			this.collectDiscos = discos;
			for (let i = 0; i < discos.length; i++) {
				for (let j = 0; j < discos[i]['researchObjs'].length; j++) {
					titles += discos[i]['researchObjs'][j].substring(discos[i]['researchObjs'][j].indexOf("#") + 1, discos[i]['researchObjs'][j].length) + "|";
				}
				this.discos[i]['titles'] = titles;
				this.discos[i]['operation'] = "Collected";
				titles = "";
			}
			this.searching = false;
		});

	}

}

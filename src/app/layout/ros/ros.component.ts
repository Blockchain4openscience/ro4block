import { Component, OnInit } from '@angular/core';
import { ROService } from '../../shared/services/ro/ro.service';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
	selector: 'app-ros',
	templateUrl: './ros.component.html',
	styleUrls: ['./ros.component.scss'],
	providers: [StorageService, ROService]
})
export class RosComponent implements OnInit {

	user: Object;
	searching: boolean = true;
	options: Object = {};
	private researchObjs: Array<any> = [];
	private collectObjs: Array<any> = [];
	constructor(private roService: ROService,
				private storageService: StorageService) { }

	async ngOnInit() {
		this.user = this.storageService.read<Object>('user');
			await this.roService.mineCollected(this.user['researcherId']).then(Robjs => {
			this.collectObjs = Robjs ;
				for (let j = 0; j < this.researchObjs.length; j++) {
					this.collectObjs[j]['operation'] = "Collect";
				}
				return this.collectObjs;
		})
		.then(async () => {
			await this.roService.mineClaimed(this.user['researcherId']).then(Robjs => {
				this.researchObjs = Robjs ;
				for (let j = 0; j < this.researchObjs.length; j++) {
					this.researchObjs[j]['operation'] = "Contributor";
				}
				console.log(this.researchObjs);
			});
		});

		for(let i = 0; i < this.collectObjs.length; i++){
			this.researchObjs.push(this.collectObjs[i]);
		}
	}

}

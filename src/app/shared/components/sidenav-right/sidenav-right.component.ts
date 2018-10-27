import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet/wallet.service';
import { StorageService } from '../../services/storage/storage.service';
import { ResearcherService } from '../../services/researcher/researcher.service';
import { last } from '@angular/router/src/utils/collection';

@Component({
	selector: 'app-sidenav-right',
	templateUrl: './sidenav-right.component.html',
	styleUrls: ['./sidenav-right.component.css'],
	providers: [WalletService, StorageService, ResearcherService]
})
export class SidenavRightComponent implements OnInit {
	isExpandedRight : boolean = false;
	user: Object;
	private researcherHistory: any[] = [];
	private history: any[] = [];
	private researcher : Object;
	constructor(private walletService: WalletService,
				private storageService: StorageService,
				private researcherService: ResearcherService) { }

	ngOnInit() {
		this.readHistory();
	}

	async readHistory() {
		this.user = this.storageService.read<Object>('user');
		this.researcherHistory = [];
		const transaction = {
			$class: 'org.bforos.Researcher',
			researcherId: this.user['researcherId'],
			email: this.user['email'],
			firstName: this.user['firstName'],
			lastName: this.user['lastName']
		};

		await this.researcherService.find(this.user['researcherId'])
		.then(researcher => {
			this.researcher = researcher;

		});
		
		await this.walletService.getAllHistorian().then(
			(data=>{
				this.history = data;
				//console.log(data);
			})
		)
		.catch(error => console.log(error));

		
		
		console.log(this.history.length)
		for(let i = 0; i < this.history.length; i++){
			//console.log(this.history[i].eventsEmitted.length);
			for(let j = 0; j < 	this.history[i].eventsEmitted.length; j++){
				//console.log(this.history[i].eventsEmitted[j].claimer);
				if(this.history[i].eventsEmitted[j].claimer == ('resource:org.bforos.Researcher#' + this.user['researcherId'])){
					let transactionInfo = this.history[i].eventsEmitted[j];
					transactionInfo['transactionId'] = this.history[i].transactionId;
					this.researcherHistory.push(transactionInfo);
				}
			}
		}
		console.log(this.researcherHistory);
		/*
		this.walletService.requestResearcherHistory(transaction).subscribe(
			(data) => {
				console.log(data);
				this.walletService.getResearcherHistory(data.transactionId).subscribe(
					async (results) => {
						
						console.log(results);
						results = results[0].eventsEmitted[0].results;
						for (let i = 0; i < results.length; i++) {
							const result = JSON.parse(results[i]);
							const record = {
								historianRecord: await this.walletService.getHistorianRecord(result.tx_id),
								value: JSON.parse(result.value)
							};
							this.researcherHistory.push(record);
						}
						console.log(this.researcherHistory);
					}
				)
			})
*/
	}


	setExpandedRight(expand: boolean) {
		this.isExpandedRight = expand;
	}
}

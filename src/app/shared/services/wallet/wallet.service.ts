import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {take, catchError, map} from "rxjs/operators";

@Injectable()
export class WalletService {

	private headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
	private researcherHistory: Object[] = [];
	private resolveSuffix = '?resolve=true';
	private historyUrl = `${environment.serviceUrl}/api/ResearcherHistory`;
	private historianUrl = `${environment.serviceUrl}/api/system/historian`;
	private getHistoryUrl = `${environment.serviceUrl}/api/queries/selectHistorianRecordsByTrxId`

	constructor(private httpClient: HttpClient) { }

	requestResearcherHistory(itemtoAdd: any): Observable<any> {
		return this.httpClient.post(this.historyUrl, itemtoAdd, {observe: 'response'})
			.pipe(
				map(this.extractData),
				catchError(this.handleError)
			);
	}

	getResearcherHistory(researcherId: string): Observable<any[]> {
		const params = (new HttpParams()).append('transactionId', researcherId);
		return this.httpClient.get(this.getHistoryUrl, {observe: 'response', headers: this.headers, params: params})
		.pipe(
			map(this.extractData),
			catchError(this.handleError)
		);
	}

	getHistorianRecord(transactionId: string): Promise<any> {
		return this.httpClient.get(this.historianUrl + "/" + transactionId + this.resolveSuffix, {observe: 'response'})
			.pipe(
				map(this.extractData),
				catchError(this.handleError)
			)
			.pipe(
				take(1)
			)
			.toPromise();
	}

	getAllHistorian() : Promise<Array<any>> {
		
		return this.httpClient.get(this.historianUrl).toPromise()
		.then( data =>{
			let historian: Object[] = data as Array<Object>;
			return historian;
		});
	}

	private handleError(error: any): Observable<string> {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		const errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return throwError(errMsg);
	}

	private extractData(res: any): any {
		//console.log(res);
		return res.body;
	}	
}
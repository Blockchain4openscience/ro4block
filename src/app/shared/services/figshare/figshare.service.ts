import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ROService } from '../../services/ro/ro.service';
import { StorageService } from '../../services/storage/storage.service'

@Injectable()
export class FigshareService {

    private repositories: any[] = [];
	private user: Object;

    constructor(private http: HttpClient,
		private roService: ROService,
        private storageService: StorageService) { }
        
    auth(code: string, orcid: string): Promise<any[]> {
        const url = `${environment.figshareApi}`;
        let headers = new HttpHeaders({ 'Accept': 'application/json' });
		 // Website you wish to allow to connect
		headers.append('Access-Control-Allow-Origin', 'http://localhost:8888');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		headers.append('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
        headers.append('Access-Control-Allow-Credentials', 'true');
        let body = new HttpParams();
		this.user = this.storageService.read<Object>('user');
		body = body.set('client_id', environment.figshareClientId);
		body = body.set('client_secret', environment.figshareClientSecret);
        body = body.set('grant_type', 'authorization_code');
        body = body.set('code', code);
        console.log("call oauth");
        return this.http.post(url, body, { headers: headers }).toPromise()
        .then(async (result) => {
            console.log(result);
            return this.http.get<any[]>(`${environment.figshareUserApi}/account/articles?access_token=${result['access_token']}`).toPromise()
            .then(async (repos) => {                    
                for (let i = 0; i < repos.length; i++) {
                    let exist = await this.roService.exists(repos[i]['url_public_html']);
                    console.log(repos[i]['url_public_html']);
                    if (!exist) {
                        let repository = repos[i];
                        repository['$class'] =  "org.bforos.ResearchOJ",
                        repository['researchObjId'] = repos[i]['url_public_html'],
                        repository['typero'] = 'CODE',
                        repository['uri'] = repos[i]['url_public_html'],
                        repository['owner'] = orcid
                        repository['name'] = repos[i]['title'];
                        repository['claimed'] = false;
                        switch(repos[i]['defined_type'])
                        {
                            case 1:
                            repository['description'] = 'Figure';
                            break;
                            case 2:
                            repository['description'] = 'Media';
                            break;
                            case 3:
                            repository['description'] = 'Dataset';
                            break;
                            case 4:
                            repository['description'] = 'Fileset';
                            break;
                            case 5:
                            repository['description'] = 'Poster';
                            break;
                            case 6:
                            repository['description'] = 'Paper';
                            break;
                            case 7:
                            repository['description'] = 'Presentation';
                            break;
                            case 8:
                            repository['description'] = 'Thesis';
                            break;
                            case 9:
                            repository['description'] = 'Code';
                            break;
                            case 11:
                            repository['description'] = 'Metadata';
                            break;
                            case 12:
                            repository['description'] = 'Preprint';
                            break;
                            default:
                        }

                        this.repositories.push(repos[i]);
                    }
                    else {
                        this.roService.getSingle(repos[i]['url_public_html'])
                            .then(async data => {
                                let repository = data;
                                repository['name'] = repos[i]['title'];
                                console.log(repository['contributors']);
                                if(repository['contributors'] == "resource:org.bforos.Researcher#" + this.user['researcherId']){
                                    repository['claimed'] = true;
                                }
                                else {
                                    repository['claimed'] = false;
                                }
                                //repository['claimed'] = await this.roService.isClaimed(this.user['researcherId'], repository['researchObjId']);
                                
                                this.repositories.push(repository);
                            })
                            .catch(error => {
                                console.log("Cannot create Research Object ")
                            })
                    }
                    
                }
                return await this.repositories;
            })
            .catch(error => {
                console.log("Don't read repos");
                error.message;
            })
        })
        .catch(this.handleError);           
    }
    private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
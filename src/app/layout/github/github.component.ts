import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { StorageService } from '../../shared/services/storage/storage.service';
import { GithubService } from '../../shared/services/github/github.service';
import { ROService } from '../../shared/services/ro/ro.service';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.css'],
	providers: [ROService, StorageService, GithubService]
})
export class GithubComponent implements OnInit {

	public githubRepos: Array<any>;
    public user: Object;
	public searching: boolean = true;
	query = false;
	public githubURL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=" + environment.githubClientId;
	
	constructor(private matIconRegistry: MatIconRegistry,
				private domSanitizer: DomSanitizer,
				private activatedRoute: ActivatedRoute,
				private storageService: StorageService,
				private githubService: GithubService,
				private roService: ROService,
				private router: Router) {
		this.matIconRegistry.addSvgIcon("github-white",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/github-white.svg"));
	}

	ngOnInit() {
		this.user = this.storageService.read<Object>('user');
        this.activatedRoute.queryParams.subscribe((params: Params) => {
			let code = params['code'];
			console.log(code);
            if (typeof code !== 'undefined' && localStorage.getItem('githubRepos') === null) {
				console.log('here');
                this.githubService.auth(code, this.user['id']).then(async repos => {
                    console.log(repos);
					this.githubRepos = repos;
                    this.storageService.write('githubRepos', this.githubRepos);
                    this.router.navigateByUrl('/home/search/github');
					this.searching = false;
					this.query = false;
                });
                //this.githubService.auth(code, this.user['orcid']).then(result => {console.log(result)})
            } else {
				this.githubRepos = this.storageService.read<Array<any>>('githubRepos');
				this.searching = false;
				console.log(this.githubRepos);
            }
          });
	}

	claim(researchObject: any){
        console.log(researchObject);
		let ro = {
			$class: "org.bforos.CreateResearchOJ",
			researchObjId: researchObject['researchObjId'],
  			typeRO: researchObject['typero'],
			uri: researchObject['uri'],
			creator: `resource:org.bforos.Researcher#${this.user['researcherId']}`
			  
		}

		this.roService.exists(researchObject['researchObjId'])
		.then(data => {
			console.log(data);
			if(!data){
				this.roService.create(ro)
				.then(result => {
					researchObject['claimed'] = true;
					this.storageService.write('githubRepos', this.githubRepos);
				});
			
			}
			else {
				this.roService.claim(this.user['researcherId'], researchObject['researchObjId'])
				.then(claimResult => {
					researchObject['claimed'] = true;
					this.storageService.write('githubRepos', this.githubRepos);
				});
			}  
		})
		.catch(error => {console.log("error read if file exists")});      
    }

}

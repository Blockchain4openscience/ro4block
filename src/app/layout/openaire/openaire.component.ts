import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { StorageService } from '../../shared/services/storage/storage.service';
import { OpenaireService } from '../../shared/services/openaire/openaire.service';
import { ROService } from '../../shared/services/ro/ro.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-openaire',
  templateUrl: './openaire.component.html',
  styleUrls: ['./openaire.component.css'],
  providers: [ROService, StorageService, OpenaireService]
})
export class OpenaireComponent implements OnInit {

  public openaireRepos: Array<any>;
  public user: Object;
	public searching: boolean = true;
	query = false;
  //public openaireURL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=" + environment.githubClientId;
  
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private storageService: StorageService,
              private openaireService: OpenaireService,
              private roService: ROService,
              private router: Router) {
    this.matIconRegistry.addSvgIcon("openaire",
    this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/openaire.svg"));
  }

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let code = params['code'];
      console.log(code);
      if (typeof code !== 'undefined' && localStorage.getItem('openaireRepos') === null) {
        console.log('here');
        this.openaireService.auth(code, this.user['id']).then(async repos => {
          console.log(repos);
          this.openaireRepos = repos;
          this.storageService.write('openaireRepos', this.openaireRepos);
          this.router.navigateByUrl('/home/search/openaire');
          this.searching = false;
          this.query = false;
        });
      } else {
          this.openaireRepos = this.storageService.read<Array<any>>('openaireRepos');
          this.searching = false;
          console.log(this.openaireRepos);
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
          this.storageService.write('openaireRepos', this.openaireRepos);
        });
    
      }
      else {
        this.roService.claim(this.user['researcherId'], researchObject['researchObjId'])
        .then(claimResult => {
          researchObject['claimed'] = true;
          this.storageService.write('openaireRepos', this.openaireRepos);
        });
      }  
    })
    .catch(error => {console.log("error read if file exists")});      
  }

}

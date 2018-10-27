import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { StorageService } from '../../shared/services/storage/storage.service';
import { FigshareService } from '../../shared/services/figshare/figshare.service';
import { ROService } from '../../shared/services/ro/ro.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-figshare',
  templateUrl: './figshare.component.html',
  styleUrls: ['./figshare.component.css'],
  providers: [ROService, StorageService, FigshareService]
})
export class FigshareComponent implements OnInit {

  public figshareRepos: Array<any>;
  public user: Object;
	public searching: boolean = true;
	query = false;
  public figshareURL = "https://figshare.com/account/applications/authorize?response_type=code&client_id=" + environment.figshareClientId;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private storageService: StorageService,
              private figshareService: FigshareService,
              private roService: ROService,
              private router: Router) {
                this.matIconRegistry.addSvgIcon("figshare-bw",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/figshare-bw.svg"));
	}

  ngOnInit() {
    this.user = this.storageService.read<Object>('user');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let code = params['code'];
      console.log(code);
      if (typeof code !== 'undefined' && localStorage.getItem('figshareService') === null) {
          console.log('here');
          this.figshareService.auth(code, this.user['id']).then(async repos => {
              console.log(repos);
              this.figshareRepos = repos;
              this.storageService.write('figshareRepos', this.figshareRepos);
              this.router.navigateByUrl('/home/search/figshare');
              this.searching = false;
              this.query = false;
          });
            //this.githubService.auth(code, this.user['orcid']).then(result => {console.log(result)})
      } else {
        this.figshareRepos = this.storageService.read<Array<any>>('figshareRepos');
        this.searching = false;
        console.log(this.figshareRepos);
      }
      });
  }
  claim(researchObject: any){
    console.log(researchObject);
    let ro = {
      $class: "org.bforos.CreateResearchOJ",
      researchObjId: researchObject['uri'],
      typeRO: "CODE",
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
          this.storageService.write('figshareRepos', this.figshareRepos);
        });
    
      }
      else {
        this.roService.claim(this.user['researcherId'], researchObject['researchObjId'])
        .then(claimResult => {
          researchObject['claimed'] = true;
          this.storageService.write('figshareRepos', this.figshareRepos);
        });
      }  
    })
  .catch(error => {console.log("error read if file exists")});      
  }
}


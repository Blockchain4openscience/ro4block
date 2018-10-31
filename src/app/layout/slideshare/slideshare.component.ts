import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StorageService } from '../../shared/services/storage/storage.service';
import { SlideshareService } from '../../shared/services/slideshare/slideshare.service';
import { ROService} from '../../shared/services/ro/ro.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-slideshare',
  templateUrl: './slideshare.component.html',
  styleUrls: ['./slideshare.component.css'],
  providers: [ROService, StorageService, SlideshareService]
})

export class SlideshareComponent implements OnInit {
  public slideshareRepos: Array<any> = [];
  public user: Object;
  public searching: boolean = true;
  public slideshareUsername: string = '';
  public slidesharePassword: string = '';
  query = false;

  constructor(private roService: ROService,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private slideshareService: SlideshareService,
      public router: Router) {}

  ngOnInit() {
      this.user = this.storageService.read<Object>('user');
      if (this.slideshareUsername !== '' && localStorage.getItem('slideshareRepos') === null) {
          this.slideshareService.search(this.slideshareUsername, this.slidesharePassword, this.user['id']).then(async repos => {
            console.log(repos);
					  this.slideshareRepos = repos;
            this.storageService.write('slideshareRepos', this.slideshareRepos);
            this.router.navigateByUrl('/home/search/slideshare');
					  this.searching = false;
					  this.query = false;
          });
      } else {
          this.slideshareRepos = this.storageService.read<Array<any>>('slideshareRepos');
          this.searching = false;
      }
  }

  search(username: string, password: string){
      this.slideshareUsername = username;
      let presentations = this.slideshareService.search(this.slideshareUsername, this.slidesharePassword, this.user['orcid']).then(presentations => {
          this.slideshareRepos = presentations;
          this.storageService.write('slideshareRepos', this.slideshareRepos);
          this.searching = false;
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
        this.storageService.write('slideshareRepos', this.slideshareRepos);
      });
    }
    else {
      this.roService.claim(this.user['researcherId'], researchObject['researchObjId'])
      .then(claimResult => {
        researchObject['claimed'] = true;
        this.storageService.write('slideshareRepos', this.slideshareRepos);
      });
    }  
  })
  .catch(error => {console.log("error read if file exists")});      
  }
}


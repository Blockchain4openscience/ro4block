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
  public slidesharePresentations: Array<any>;
  public user: Object;
  public searching: boolean = true;
  public slideshareUsername: string = '';
  public slidesharePassword: string = '';

  constructor(private roService: ROService,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private slideshareService: SlideshareService,
      public router: Router) {}

  ngOnInit() {
      this.user = this.storageService.read<Object>('user');
      if (this.slideshareUsername !== '' && localStorage.getItem('slidesharePresentations') === null) {
          this.search(this.slideshareUsername, this.slidesharePassword);
      } else {
          this.slidesharePresentations = this.storageService.read<Array<any>>('slidesharePresentations');
          this.searching = false;
      }
  }

  search(username: string, password: string){
      this.slideshareUsername = username;
      let presentations = this.slideshareService.search(this.slideshareUsername, this.slidesharePassword, this.user['orcid']).then(presentations => {
          this.slidesharePresentations = presentations;
          this.storageService.write('slidesharePresentations', this.slidesharePresentations);
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


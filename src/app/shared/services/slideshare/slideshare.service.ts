import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { ROService } from '../../services/ro/ro.service';
import { StorageService } from '../../services/storage/storage.service';
import * as moment from 'moment';
import * as hash from 'hash.js';
import * as xml2js from 'xml2js';

@Injectable()
export class SlideshareService {

  //private headers = new Headers({'Content-Type': 'application/json'});
  private slideshareUrl = `${environment.slideshareApi}`;  // URL to web api
  private repositories: any[] = [];
  private user: Object;

  constructor(private http: Http,
    private roService: ROService,
    private storageService: StorageService ){ }

  search(username: string, password: string, orcid:string): Promise<Array<any>> {
    let ts = moment().format('X');
    let sha1 = hash.sha1().update(`${environment.slideshareSharedSecret}` + ts.toString()).digest('hex');
    const url = `${this.slideshareUrl}?api_key=${environment.slideshareApiKey}&ts=${ts}&hash=${sha1}&username_for=${username}`;    
    var Json;
    this.user = this.storageService.read<Object>('user');
    return this.http.get(url).toPromise()
      .then(async(xml) => {
        xml2js.parseString(xml.text(), function (err, result) {
          Json = result;
        });
        for (let i = 0; i < Json.User.Slideshow.length; i++) {
          console.dir(Json.User.Slideshow[i]['URL'].toString());  
          let exist = await this.roService.exists(Json.User.Slideshow[i]['URL'].toString());
          if (!exist) {
            let repository = Json.User.Slideshow[i];
            repository['$class'] =  "org.bforos.ResearchOJ";
            let sha256 = hash.sha256().update(Json.User.Slideshow[i]['URL'].toString()).digest('hex');
            repository['researchObjId'] = sha256;
            repository['typero'] = 'PRESENTATION';
            repository['uri'] = Json.User.Slideshow[i]['URL'].toString();
            repository['owner'] = orcid;
            repository['name'] = Json.User.Slideshow[i]['Title'].toString();
            repository['claimed'] = false;
            repository['language'] = Json.User.Slideshow[i]['Language'].toString();
            repository['description'] = Json.User.Slideshow[i]['Description'].toString();
            this.repositories.push(Json.User.Slideshow[i]);
          }
          else {
            this.roService.getSingle(Json.User.Slideshow[i]['URL'].toString())
              .then(async data => {
                let repository = data;
                repository['name'] = Json.User.Slideshow[i]['Title'].toString();
                repository['language'] = Json.User.Slideshow[i]['Language'].toString();
                repository['description'] = Json.User.Slideshow[i]['Description'].toString();
                console.log(repository['contributors']);
                if(repository['contributors'] == "resource:org.bforos.Researcher#" + this.user['researcherId']){
                  repository['claimed'] = true;
                }
                else {
                  repository['claimed'] = false;
                }
                this.repositories.push(repository);
              })
              .catch(error => {
                console.log("Cannot create Research Object ")
              })
          }
        }
        return await this.repositories;
      })
      .catch(this.handleError);  
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
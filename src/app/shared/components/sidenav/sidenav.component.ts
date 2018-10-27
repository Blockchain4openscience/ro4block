import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

  }

  route(path : string) : void {

    switch(path){
      case 'publish':{
        this.router.navigate(['home/publish']);
        break;
      }
      case 'dashboard':{
        this.router.navigate(['home/dashboard']);
        break;
      }
      case 'ros':{
        this.router.navigate(['home/research_obj']);
        break;
      }
      case 'discos':{
        this.router.navigate(['home/discos']);
        break;
      }
      case 'search':{
        this.router.navigate(['home/search']);
        break;
      }
    }
  }
  

}

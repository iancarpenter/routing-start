import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    console.log('running first');
    const initialID = Number(this.route.snapshot.params['id']);
    this.server = this.serversService.getServer(initialID);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params
      .subscribe(
        (params: Params) => {
          console.log('running subscribed');
          const subscribedID = Number(params['id']);
          this.server = this.serversService.getServer(subscribedID);
          this.serverName = this.server.name;
          this.serverStatus = this.server.status;
        }
    );

    this.route.queryParams
    .subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false ;
      }
    );
    this.route.fragment.subscribe();

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ( !this.allowEdit ) {
      return true;
    }
    if ( (this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}

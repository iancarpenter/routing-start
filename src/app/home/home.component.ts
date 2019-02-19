import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServersService } from '../servers/servers.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private serversService: ServersService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], { queryParams: {allowEdit: '1'}, fragment: 'loading' });

  }

  onLoadUser(id: HTMLInputElement, name: HTMLInputElement) {
    this.router.navigate(['/users', id.value, name.value]);
  }

  onGetServer() {
    console.log(this.serversService.getServer(1).name);
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularfireService } from '../services/angularfire.service';

@Component({
  selector: 'vote-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(public afService: AngularfireService, private router: Router) {
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth === null) {
          console.log('Not Logged in!');
          this.isLoggedIn = false;
        } else {
          console.log('Successfully Logged in!');
          this.isLoggedIn = true;
        }
      }
    )
  }

  ngOnInit() {
  }

  logout() {
    this.afService.logout();
  }

}

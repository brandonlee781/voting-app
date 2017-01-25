import { Component, OnInit } from '@angular/core';
import { AngularfireService } from '../services/angularfire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vote-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public afService: AngularfireService, private router: Router) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      this.router.navigate(['']);
    })
  }

  loginWithGithub() {
    this.afService.loginWithGithub().then((data) => {
      this.router.navigate(['']);
    })
  }

}

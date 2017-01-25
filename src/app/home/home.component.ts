import { Component, OnInit } from '@angular/core';
import { AngularfireService } from '../services/angularfire.service';
import { FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'vote-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private isLoggedIn: boolean;
  private polls; 

  constructor(public afService: AngularfireService, private router: Router) {
    this.afService.af.auth.subscribe(
      (auth) => {
        (auth) ? this.isLoggedIn = true : this.isLoggedIn = false;
      }
    )
    this.afService.getAllPolls().subscribe(polls => this.polls = polls);
  }

  ngOnInit() {
  }

  getSum(array) {
    return array.reduce((a,b) => (a+b));
  }

  goToPollDetails(id:string) {
    this.router.navigate([`poll/${id}`]);
  }

}

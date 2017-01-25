import { Component, OnInit } from '@angular/core';
import { AngularfireService } from '../services/angularfire.service';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'vote-user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.scss']
})
export class UserPollsComponent implements OnInit {
  userPolls;
  pollList = [];
  loaded;

  constructor(public afService: AngularfireService, private router: Router) {
    this.afService.af.auth.subscribe(auth => {
      this.afService.getUsersPolls(auth.uid).subscribe(polls => {
        polls.forEach(function(poll) {
          let val = poll.$value;
          let query =this.afService.af.database.list('/polls', {
            query: {
              orderByKey: true,
              equalTo: val
            }
          });
          query.subscribe( result => {
            this.pollList.push(result);
          } )
          this.loaded = true;
        }, this)
      })
    })
  }

  ngOnInit() {
  }

  goToPollDetail(id: string) {
    this.router.navigateByUrl(`/poll/${id}`);
  }

  getSum(array) {
    return array.reduce((a,b) => (a+b));
  }
}

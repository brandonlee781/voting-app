import { Component, OnInit } from '@angular/core';
import { AngularfireService } from '../services/angularfire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vote-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss']
})
export class NewPollComponent implements OnInit {
  private user;
  private provider;
  public pollTitle;
  public pollOptions;

  constructor(public afService: AngularfireService, private router: Router) {
    this.afService.af.auth.subscribe((auth) => {
      this.user = auth;
      (auth.google) ? this.provider = 'google' : this.provider = 'github';
    })
  }

  ngOnInit() {
  }

  createNewPoll(e) {
    e.preventDefault();
    let title = this.pollTitle;
    let options = this.pollOptions.split('\n');
    let creator = this.user[this.provider].displayName;
    let userId = this.user.uid;

    this.afService.createNewPoll(title, options, creator, userId);
  }

}

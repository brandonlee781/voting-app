import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { AngularfireService } from '../services/angularfire.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/take';
const Chart = require('chart.js');

@Component({
  selector: 'vote-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit {
  private isLoggedIn: boolean;
  @Input() poll;
  private pollId;
  private subscription: Subscription;
  public selectedOption: string;
  public customOption: string;

  constructor(
    public afService: AngularfireService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    this.activatedRoute.params.subscribe((params: Params) => this.pollId = params['id']);
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth === null) {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }
    )
    this.afService.getPoll(this.pollId)
      .subscribe(poll => {
        let obj = {
          key: poll.$key,
          title: poll.title,
          creator: poll.creator,
          datasets: [
            {
              data: [],
              label: "# of votes"
            }
          ],
          options: []
        };
        
        for (let key in poll.data) {
          obj.datasets[0].data.push(poll.data[key]);
          obj.options.push(key);
        }
        this.poll = obj;
        this.ref.detectChanges();
      });
  }

  ngOnInit() {}


  submitVote() {
    let { selectedOption, customOption, pollId } = this;

    this.afService.getPoll(pollId).take(1).subscribe(poll => {
      let newData = poll.data;
      if (selectedOption !== 'custom') newData[selectedOption]++;
      if (customOption !== undefined && customOption !== '') newData[customOption] = 1;
      this.afService.submitVote(pollId, newData);
    });
  }

  cancelCustomOption() {
    this.selectedOption = "";
    this.customOption = "";
  }


}

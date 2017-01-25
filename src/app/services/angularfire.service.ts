import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'AngularFire2';
import { Router } from '@angular/router';

@Injectable()
export class AngularfireService {
  users: FirebaseListObservable<any>;
  polls: FirebaseListObservable<any>;

  constructor(public af: AngularFire, private router: Router) {
    this.users = this.af.database.list('/users');
    this.polls = this.af.database.list('/polls');
  }

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  loginWithGithub() {
    return this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup
    })
  }
  
  logout() {
    return this.af.auth.logout();
  }

  getPoll(id: string) {
    return this.af.database.object(`/polls/${id}`);
  }

  getAllPolls() {
    return this.af.database.list('/polls');
  }

  getUsersPolls(id: string) {
    return this.af.database.list(`/users/${id}/polls`);
  }

  submitVote(id: string, data: any) {
    const poll = this.af.database.object(`/polls/${id}/`);
    poll.update({data: data});
  }

  createNewPoll(title: string, options: Array<string>, creator: string, userId: string) {
    const polls = this.af.database.list('/polls/');
    const user = this.af.database.list(`/users/${userId}/polls`);
    let pollId;
    let obj = {
      'creator': creator,
      'datasets': [
        {
          'data': [],
          'label': '# of votes'
        }
      ],
      'options': options,
      'title': title
    }
    
    while( obj.datasets[0].data.length < options.length ) {
      obj.datasets[0].data.push(0);
    }
    polls.push(obj).then( res => { 
      user.push(res.path.o[1]);
      this.router.navigate([`poll/${res.path.o[1]}`])
    });
  }


}

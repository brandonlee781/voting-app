import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { UserPollsComponent } from './user-polls/user-polls.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: 'login',
    component: LoginPageComponent 
  },
  {
    path: 'poll/:id',
    component: PollDetailComponent 
  },
  {
    path: 'new',
    component: NewPollComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'my-polls',
    component: UserPollsComponent,
    canActivate: [AuthGuardService] 
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

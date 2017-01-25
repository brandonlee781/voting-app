import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'AngularFire2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from './app.routes';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'hammerjs';

// Services
import { AngularfireService } from './services/angularfire.service'; 
import { AuthGuardService } from './services/auth-guard.service';

// Components
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { UserPollsComponent } from './user-polls/user-polls.component';


export const firebaseConfig = {
  apiKey: "AIzaSyBk_lcZTD9LFuttACgm1wEEEokUusFVWzg",
  authDomain: "fcc-voting-app-77bf9.firebaseapp.com",
  databaseURL: "https://fcc-voting-app-77bf9.firebaseio.com",
  storageBucket: "fcc-voting-app-77bf9.appspot.com",
  messagingSenderId: "155248199304"
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginPageComponent,
    HomeComponent,
    PollDetailComponent,
    NewPollComponent,
    UserPollsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule,
    routing
  ],
  providers: [
    AngularfireService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

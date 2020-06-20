import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToFeed = () => redirectLoggedInTo(['feed']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  { path: 'feed', component: FeedComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'calendar', component: CalendarComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'map', component: MapComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectLoggedInToFeed } },
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectLoggedInToFeed } },
  { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectLoggedInToFeed } },
  { path: '**', component: LoginComponent,  canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectLoggedInToFeed } } //to do: actually might do a PageNotFoundComponent
];       

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

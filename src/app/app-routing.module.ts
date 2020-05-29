import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';


const routes: Routes = [
  { path: 'feed', component: FeedComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'map', component: MapComponent},
  { path: '', component: FeedComponent, pathMatch: 'full' }, //to do: redirect to login
  { path: '**', component: FeedComponent } //to do: actually might do a PageNotFoundComponent
];       

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

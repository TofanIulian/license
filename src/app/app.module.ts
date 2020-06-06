import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FeedComponent } from './components/feed/feed.component';
import { CalendarComponent, ChunkPipe } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FeedComponent,
    CalendarComponent,
    MapComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

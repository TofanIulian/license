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
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { NewEventComponent } from './components/new-event/new-event.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    FeedComponent,
    CalendarComponent,
    MapComponent,
    ChunkPipe,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DropZoneDirective,
    FileUploaderComponent,
    NewEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    GoogleMapsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

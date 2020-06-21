import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/event.service';
import { User } from 'firebase';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  eventForm: FormGroup;
  eventPhotos: string[] = [];

  constructor(
    public router: Router,
    public eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      eventName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      date: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }
  
  get eventName() { return this.eventForm.get('eventName'); }
  get date() { return this.eventForm.get('date'); }
  get location() { return this.eventForm.get('location'); }
  get description() { return this.eventForm.get('description'); }

  createEvent(event: Event) {
    event.photoUrls = this.eventPhotos;
    this.eventService.create(event);
  }

  onUpload(urls: string[]){
    this.eventPhotos = urls;
  }

}
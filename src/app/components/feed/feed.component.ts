import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/event.service';
import { Event } from 'src/app/models/event';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  user: User;
  events: Event[] = [];

  constructor(private eventService: EventService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => this.user = user)
    this.eventService.getAllEvents().subscribe(result => {this.events = result})
  }
}

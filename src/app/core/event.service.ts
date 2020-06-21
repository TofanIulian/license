import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private db: AngularFirestore,
    private auth: AuthService) { }

  create(event: Event) {
    this.auth.user.subscribe(user => {
      event.createdById = user.uid;
      event.createdBy = user.displayName;
      event.avatarUrl = user.photoURL;
      event.createdAt = firestore.FieldValue.serverTimestamp()
      // const eventsRef = this.db.collection('events').ref;
      // eventsRef.add(event)

      const UserEventsRef = this.db.collection('users/' + user.uid + "/events").ref;
      UserEventsRef.add(event)
    })
  }

  // getAllEvents() {
  //   return this.db.collection<Event>('events', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  // }

  // getAllEventsByUserFromCollection(userId) {
  //   return this.db.collection<Event>('events', ref => ref.where('createdBy', '==', userId).orderBy('createdAt')).valueChanges();
  // }

  getAllEvents() {
    return this.db.collectionGroup<Event>('events', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }

  getAllEventsByUserId(userId) {
    return this.db.collection<Event>('users/' + userId + "/events", ref => ref.orderBy('createdAt')).valueChanges();
  }
}

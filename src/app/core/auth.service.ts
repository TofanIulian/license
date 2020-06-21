import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return of(null);
      }
    }));
  }

  register(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(credetial => this.updateUserData(credetial.user, user.displayName))
  }

  login(user) {
    return this.oAuthLogin(user);
  }

  private oAuthLogin(user) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(_ => this.router.navigate(['feed']))
  }

  private updateUserData(user, displayName?) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL,
      association: user.association ? user.association : 'none',
      roles: {
        commoner: true
      }
    }

    this.router.navigate(['profile'])
    
    return userRef.set(data, { merge: true })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.thirdPartyOAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.thirdPartyOAuthLogin(provider);
  }

  private thirdPartyOAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then(credetial => this.thirdPartyUpdateUserData(credetial.user))
      .catch((error) => {
        console.log(error)
      })
  }

  private thirdPartyUpdateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      association: user.association ? user.association : 'none',
      roles: {
        commoner: true
      }
    }

    this.router.navigate(['feed'])
    return userRef.set(data, { merge: true })
  }

  logout() {
    this.afAuth.signOut()
    this.router.navigate(['login'])
  }

  setProfilePicture(url){

    this.user.subscribe(user => {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      user.photoURL = url;
      return userRef.set(user, { merge: true })
    })
    
  }


  canCreateEvent(user: User): boolean {
    const allowed = ["association"];
    return this.checkAuthorization(user, allowed)
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}

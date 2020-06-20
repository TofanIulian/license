import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => this.user = user)
  }
  
  onUpload(urls: string[]){
    this.auth.setProfilePicture(urls[0]);
  }
}

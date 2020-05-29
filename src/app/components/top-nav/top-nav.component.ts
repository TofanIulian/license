import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  openSettings: boolean = false;
  theme: string;

  constructor() { }

  ngOnInit(): void {

    this.theme = localStorage.getItem("theme") 

    if(!this.theme) {
      this.theme = "light";
      localStorage.setItem("theme", "light")
    }

    var body = document.body;
    body.classList.add(this.theme);
  }

  togleTheme() {
    var body = document.body;
    body.classList.remove(this.theme)
    this.theme = this.theme == "light" ? "dark" : "light";
    localStorage.setItem("theme", this.theme)
    body.classList.add(this.theme);
  }
}

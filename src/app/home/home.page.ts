import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  logo = 'assets/logo.png';
  constructor(private router: Router) {}

  ngOnInit() {
    this.auth();
  }

  auth() {
    const user = localStorage.getItem('token');
    if (user == null) {
      console.log(user);
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

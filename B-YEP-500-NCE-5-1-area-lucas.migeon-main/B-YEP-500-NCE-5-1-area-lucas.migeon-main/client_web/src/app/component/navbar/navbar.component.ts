import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  public static createButtonTrigger: boolean = false;
  public static displayUserButton: boolean = false;

  constructor(public auth: AuthService,
              public route: Router) { }

  ngOnInit(): void {
  }

  public login() {
    this.auth.loginWithRedirect();
  }

  public getCreateButtonState() {
    return NavBarComponent.createButtonTrigger;
  }

  public getDisplayUserState() {
    return NavBarComponent.displayUserButton;
  }

  public navigateToCreate() {
    NavBarComponent.createButtonTrigger = true;
    this.route.navigate(['create']);
  }

  public navigateToUsers() {
    NavBarComponent.createButtonTrigger = false;
    this.route.navigate(['admin']);
  }
}

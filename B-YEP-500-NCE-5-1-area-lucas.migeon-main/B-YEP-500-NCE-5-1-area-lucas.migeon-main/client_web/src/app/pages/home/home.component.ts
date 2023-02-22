import { AuthService, User } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';

import { ActionReaction } from 'src/app/types/ActionReaction';
import { ActionReactionData } from 'src/app/types/ActionReactionData';
import { CentralServerService } from 'src/app/services/central-server.service';
import { NavBarComponent } from 'src/app/component/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user!: User | null | undefined;
  public actionReactionList: ActionReaction[] | null | undefined= [];
  public actionSelected!: ActionReactionData
  public reactionSelected!: ActionReactionData
  public static role: string = ''

  constructor(
    public auth: AuthService,
    public server: CentralServerService,
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      // this.server.getConnectionGithub();
      this.server.getActionReactionList().subscribe((res) => {
        console.log("ActionReactionListGet: ", res);
        this.actionReactionList = res;
      });
      this.server.getUsers().subscribe((res) => {
        console.log(this.user);
        if (res.god.find((user: { user_id: string | undefined; }) => user.user_id === this.user?.sub)) {
          NavBarComponent.displayUserButton = true;
        }
        if (res.plebs.find((user: { user_id: string | undefined; }) => user.user_id === this.user?.sub)) {
          NavBarComponent.displayUserButton = false;
        }
      })
      this.auth.user$.subscribe(
        (profile) => (
          this.user = profile
        ),
      );
    }
  }

  public deleteActionReaction(title: string) {
    this.server.deleteActionReaction(title).subscribe(() => {
      this.server.getActionReactionList().subscribe((res) => {
        console.log(res);
        this.actionReactionList = res;
      });
    });
  }

  public login() {
    this.auth.loginWithRedirect();
    // this.server.getUserInfo();
  }
}

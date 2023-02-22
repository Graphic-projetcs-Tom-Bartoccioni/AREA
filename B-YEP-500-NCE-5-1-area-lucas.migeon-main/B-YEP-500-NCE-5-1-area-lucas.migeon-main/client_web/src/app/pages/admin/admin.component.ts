import { Component, OnInit } from '@angular/core';

import { CentralServerService } from 'src/app/services/central-server.service';
import { Router } from '@angular/router';
import { User } from '../../types/User';
import { UserData } from 'src/app/data/UserData';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  public users: User[] = [];

  constructor (
    private user: UserData,
    private server: CentralServerService,
    private usersService: UsersService,
    private route: Router
  ) { }

  ngOnInit(): void {
      this.usersService.setUsers([]);
      this.server.getUsers().subscribe((res) => {
        for (let i = 0; res.god[i] != null; i++) {
          this.usersService.saveUser(res.god[i], 'god');
        }
        for (let i = 0; res.plebs[i] != null; i++) {
          this.usersService.saveUser(res.plebs[i], 'plebs');
        }
        this.users = this.usersService.getUsers();
      })
  }

  public deleteUser(user: User) {
    this.server.deleteUser(user.user_id).subscribe(res => {
      this.users = this.usersService.deleteUser(user);
    });
  }

  public navigateUserCreationPage() {
    this.route.navigate(["admin/create-user"]);
  }
}

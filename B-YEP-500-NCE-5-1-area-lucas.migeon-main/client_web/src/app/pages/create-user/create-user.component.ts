import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from 'src/app/types/User';
import { UsersService } from 'src/app/services/users.service';
import { CentralServerService } from 'src/app/services/central-server.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public formGroup!: FormGroup;
  public email!: AbstractControl;
  public name!: AbstractControl;
  public password!: AbstractControl;
  public role!: AbstractControl;
  public newUser: User = {user_id: "", name: "", email: "", role: ""};

  constructor(
    private route: Router,
    private usersService: UsersService,
    private server: CentralServerService
  ) {
    this.formGroup  = new FormGroup({
      email: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl('',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
    this.email = this.formGroup.controls['email'];
    this.password = this.formGroup.controls['password'];
  }

  ngOnInit(): void {
  }

  public saveUser() {
    this.newUser.email = this.email.value;
    this.newUser.name = this.email.value;
    this.newUser.password = this.password.value;
    this.newUser.role = "plebs";
    this.addUser(this.newUser);
    this.route.navigate(["admin"]);
  }

  public addUser(user: User) {
    if (user.email != '' && user.password != '') {
      this.server.createUser(user.email, user.password).subscribe(res => {
        console.log(res);
        this.usersService.saveUser(user);
      });
    }
  }

  public navigateToUsers() {
    this.route.navigate(['admin'])
  }

  public getEmail() {
    return (<FormControl>this.formGroup.get('email'));
  }
  public getName() {
    return (<FormControl>this.formGroup.get('name'));
  }
  public getPassword() {
    return (<FormControl>this.formGroup.get('password'));
  }
  public getRole() {
    return (<FormControl>this.formGroup.get('role'));
  }
}

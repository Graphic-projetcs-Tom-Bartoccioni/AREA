import { Injectable } from "@angular/core";
import { User } from "../types/User";

export class UsersService {
    private users: User[] = [];

    public saveUser(user: User, role?: string) {
      if (role) {
        user.role = role;
      }
      this.users.push(user);
    }

    public deleteUser(user: User): User[] {
      if (this.users?.find(userSearch => userSearch.user_id === user.user_id) != null) {
        console.log("find user");
        this.users = this.users?.filter(userSearch => userSearch.user_id != user.user_id);
      }
      return this.users;
    }

    public getUsers(): User[] {
      return this.users;
    }

    public setUsers(users: User[]) {
      this.users = users;
    }
}

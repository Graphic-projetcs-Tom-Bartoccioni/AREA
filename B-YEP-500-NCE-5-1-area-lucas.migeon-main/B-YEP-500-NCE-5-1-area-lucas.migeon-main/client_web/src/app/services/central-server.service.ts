import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, TimeoutError, throwError } from 'rxjs';

import { ActionReaction } from '../types/ActionReaction'
import { Injectable } from "@angular/core";
import { ServerPort } from "../data/ServerPort";
import { User } from "../types/User";
import { catchError } from 'rxjs/operators';

export interface ActionResponse {
  status: string;
  error: string;
  id?: string;
}

@Injectable()
export class CentralServerService {
    public constructor(
        private http: HttpClient
    ) {}

    public getActionReactionList(): Observable<ActionReaction[]> {
      return this.http.get<ActionReaction[]>(encodeURI(`http://localhost:${ServerPort.port}/api/app/`))
      .pipe(
        catchError(this.handleHttpError),
      );
    }

    public saveActionReaction(actionReaction: ActionReaction): Observable<ActionReaction> {
      return this.http.post<ActionReaction>(encodeURI(`http://localhost:${ServerPort.port}/api/app/`), actionReaction)
      .pipe(
        catchError(this.handleHttpError),
      );
    }

    public deleteActionReaction(title: string): Observable<ActionResponse> {
      return this.http.delete<any>(encodeURI(`http://localhost:${ServerPort.port}/api/app/${title}`))
      .pipe(
        catchError(this.handleHttpError),
      );
    }

    public getUsers(): Observable<any> {
      return this.http.get<any>(encodeURI(`http://localhost:${ServerPort.port}/api/users/`))
      .pipe (
        catchError(this.handleHttpError)
      )
    }

    public deleteUser(user_id: string | undefined): Observable<any> {
      return this.http.delete<any>(encodeURI(`http://localhost:${ServerPort.port}/api/users/${user_id}`))
      .pipe (
        catchError(this.handleHttpError)
      )
    }

    public createUser(email: string | undefined, password: string | undefined): Observable<any> {
        return this.http.post<any>(encodeURI(`http://localhost:${ServerPort.port}/api/users/`), {email, password})
        .pipe (
          catchError(this.handleHttpError)
        )
    }
    // public getConnectionGithub() {
    //   this.http.get<any>(encodeURI('http://localhost:8081/auth/github'))
    //   .subscribe(res => {
    //     console.log(res);
    //   })
    // }

    // public getUserInfo() {
    //     this.http.get<any>(encodeURI(`https://dev-aax8fs5i.eu.auth0.com/userinfo`))
    //     .subscribe(res => {
    //         console.log("Result: ", res);
    //     }, err => {
    //         console.log("Error: ", err);
    //     })
    // }

    // public getUsers() {
    //     this.http.get<any>(encodeURI(`http://localhost:8081/api/app/`))
    //     .subscribe(res => {
    //         console.log(res);
    //     }, err => {
    //         console.log(err);
    //     })
    // }

    private handleHttpError(error: HttpErrorResponse): Observable<never> {
      console.log(error);
      console.log(error.status);
      const errMsg = { status: 0, message: '', details: undefined };
      if (error && error instanceof TimeoutError) {
        errMsg.status = 408;
        errMsg.message = error.message;
        errMsg.details = undefined;
      } else if (error) {
        errMsg.status = error.status;
        errMsg.message = error.message ? error.message : error.toString();
        errMsg.details = error.error ? error.error : undefined;
      }
      return throwError(errMsg);
    }
}

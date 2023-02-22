import { AuthHttpInterceptor, AuthModule, User } from '@auth0/auth0-angular'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ActionData } from './data/ActionData';
import { AdminComponent } from './pages/admin/admin.component';
import { ApkComponent } from './pages/client.apk/apk.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CentralServerService } from './services/central-server.service';
import { CreateComponent } from './pages/create/create.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { HomeComponent } from './pages/home/home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon'
import { NavBarComponent } from './component/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ReactionData } from './data/ReactionData';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerPort } from './data/ServerPort';
import { UserData } from './data/UserData';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CreateComponent,
    AdminComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    [BrowserAnimationsModule],
    MatExpansionModule,
    AuthModule.forRoot({
      domain: 'dev-aax8fs5i.eu.auth0.com',
      clientId: 'djVKHY1msUi6RIYLzaNf5K95sz62jKId',
      audience: 'https://action.reaction/api',
      scope: 'read:users update:users delete:users',
      httpInterceptor: {
        allowedList: [
          {
            uri: `http://localhost:${ServerPort.port}/api/app/*`,
            tokenOptions: {
              audience: 'https://action.reaction/api'
            }
          },
          {
            uri: `http://localhost:${ServerPort.port}/api/users/*`,
            tokenOptions: {
              audience: 'https://action.reaction/api',
              scope: 'read:users update:users delete:users'
            }
          }
        ]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    CentralServerService,
    ActionData,
    ReactionData,
    UserData,
    UsersService,
    { provide: HTTP_INTERCEPTORS , useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

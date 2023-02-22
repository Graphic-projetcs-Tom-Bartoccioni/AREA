import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { ApkComponent } from './pages/client.apk/apk.component';
import { CreateComponent } from './pages/create/create.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/create-user', component: CreateUserComponent },
    { path: 'client.apk', component: ApkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

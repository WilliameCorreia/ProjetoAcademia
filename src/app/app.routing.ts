import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './login/login.component';

/* const routes: Routes =[
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
]; */

const routes: Routes = [
  {path: '', component: AuthComponent},
  {
    path: '', component: AdminLayoutComponent,
    children:[{
      path:'', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

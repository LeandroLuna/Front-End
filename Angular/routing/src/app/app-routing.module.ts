import { ServerResolver } from './servers/server-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent
      },
    ]
  },
  {
    path: 'servers',
    component: ServersComponent,
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: {server: ServerResolver}
      },
      {
        path: ':id/edit',
        canDeactivate: [CanDeactivateGuard],
        component: EditServerComponent
      },
    ]
  },
  // {
  //   path: 'not-found',
  //   component: PageNotFoundComponent
  // },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {message: 'Page not found!'}
  },
  { // Must be the last of routes array.
    path: '**',
    redirectTo: 'not-found'
  }
]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{

}

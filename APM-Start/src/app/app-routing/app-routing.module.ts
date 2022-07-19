import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../home/welcome.component';
import {PageNotFoundComponent} from '../page-not-found.component';
import {LoginComponent} from '../user/login.component';
import {AuthGuard} from '../auth-guard.service';


const routes: Routes = [
  {path: 'home', component: WelcomeComponent},
  {path: 'welcome', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'products',
    canActivate: [AuthGuard],
    data: {preload: false},
    loadChildren: () => import('../products/product.module').then(m => m.ProductModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

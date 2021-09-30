import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'calculator/:id',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: '',
    redirectTo: 'calculator/general',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

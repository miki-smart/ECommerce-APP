import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ShopComponent } from './feature/shop/shop.component';
import { ProductDetailsComponent } from './feature/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServererrorComponent } from './core/servererror/servererror.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'home',component:HomeComponent,data:{breadcrumb:'Home'}},
  {
    path: 'test-error',
    component: TestErrorComponent,data:{breadcrumb:'Test Errors'}
  },
  {
    path: 'server-error',
    component: ServererrorComponent, data: {breadcrumb: 'Server Error'}
  },
  {
    path: 'not-found',
    component: NotfoundComponent, data: {breadcrumb: 'Not Found'}
  },
    {path:'feature',loadChildren:()=>import('./feature/feature.module').then(m=>m.FeatureModule),data:{breadcrumb:'Feature'}},
    {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

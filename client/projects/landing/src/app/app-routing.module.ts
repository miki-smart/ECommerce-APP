import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ShopComponent } from './feature/shop/shop.component';
import { ProductDetailsComponent } from './feature/product-details/product-details.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
    {path:'feature',loadChildren:()=>import('./feature/feature.module').then(m=>m.FeatureModule)},
    {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

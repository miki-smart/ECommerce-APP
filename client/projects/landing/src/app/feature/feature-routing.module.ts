import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
export const routes:Routes = [
    {path:'',component:ShopComponent},
    {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule),data:{breadcrumb:'Shop'}},
    {path:'basket',loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule),data:{breadcrumb:'Basket'}},
    ];
    
    @NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [RouterModule],
    })
    export class FeatureRoutingModule { }
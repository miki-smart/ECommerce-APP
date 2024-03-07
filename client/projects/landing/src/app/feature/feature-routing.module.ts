import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
export const routes:Routes = [
    {path:'',component:ShopComponent},
    {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
    ];
    
    @NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [RouterModule],
    })
    export class FeatureRoutingModule { }
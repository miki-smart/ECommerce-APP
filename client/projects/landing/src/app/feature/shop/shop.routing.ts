import { NgModule } from "@angular/core";
import { ShopComponent } from "./shop.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { Router, RouterModule, Routes } from "@angular/router";
export const routes: Routes = [
    {path:'',component:ShopComponent},
    {path:':id',component:ProductDetailsComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ShopRoutingModule {}
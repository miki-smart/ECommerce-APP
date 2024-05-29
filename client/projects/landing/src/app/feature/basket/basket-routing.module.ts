import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket.component';

export const routes: Routes = [
  {path:'',component:BasketComponent,data:{breadcrumb:'Basket'}}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketRoutingModule { }

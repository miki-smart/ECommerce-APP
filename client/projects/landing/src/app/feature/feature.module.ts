import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItemsComponent } from './product-items/product-items.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { BrandListComponent } from './shop/brand-list/brand-list.component';
import { TypeListComponent } from './shop/type-list/type-list.component';
import { PaginationHeaderComponent } from '../shared/component/pagination-header/pagination-header.component';
import { SharedModule } from '../shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { ShopModule } from './shop/shop.module';
import { BasketComponent } from './basket/basket.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
    declarations: [
        ProductItemsComponent,
        ProductDetailsComponent,
        BrandListComponent,
        TypeListComponent,
        HomeComponent,
        ShopComponent,
        BasketComponent,

    ],
    exports: [
        ProductItemsComponent,
        ProductDetailsComponent,
        HomeComponent,
        ShopComponent,
        BrandListComponent,
        TypeListComponent,
        FeatureRoutingModule,
        CarouselModule
    ],
    imports: [SharedModule,FormsModule,CommonModule,
    FeatureRoutingModule,
 CarouselModule.forRoot()],
})
export class FeatureModule { }
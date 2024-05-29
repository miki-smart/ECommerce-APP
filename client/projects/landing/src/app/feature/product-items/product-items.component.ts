import { Component, Input } from '@angular/core';
import { IProduct } from '../../core/models/iproduct.model';
import { ProductService } from '../../core/service/product.service';
import { BasketService } from '../../core/service/basket.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css'
})
export class ProductItemsComponent {
@Input() product:IProduct;
constructor(private basketService:BasketService) {}

addItemToBasket(){
  this.basketService.addItemToBasket(this.product);
}
}

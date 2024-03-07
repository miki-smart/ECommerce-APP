import { Component, Input } from '@angular/core';
import { IProduct } from '../../core/models/iproduct.model';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css'
})
export class ProductItemsComponent {
@Input() product:IProduct;
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { IProduct } from '../../core/models/iproduct.model';
import { ProductService } from '../../core/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product:IProduct;
constructor(private productService:ProductService, private activatedRoute:ActivatedRoute){
  
  this.productService.getProductById(this.activatedRoute.snapshot.params.id).subscribe(product=>{
    this.product = product.data[0];
  })
}
}

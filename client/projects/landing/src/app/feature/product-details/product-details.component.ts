import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { IProduct } from '../../core/models/iproduct.model';
import { ProductService } from '../../core/service/product.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
constructor(private productService:ProductService, 
  private activatedRoute:ActivatedRoute,
  private breadcrumservice:BreadcrumbService)
  
  {
  
  this.breadcrumservice.set('@productDetails', ' ');
}
ngOnInit() {
this.loadProduct();
}
loadProduct(){
  this.productService.getProductById(+this.activatedRoute.snapshot.params.id).subscribe(res=>{
    console.log(res);
    this.product = res;
    this.breadcrumservice.set('@productDetails',this.product.name );
  },error=>{console.log(error)}
  )
}
}

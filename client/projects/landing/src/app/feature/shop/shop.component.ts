import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { IProduct } from '../../core/models/iproduct.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductItemsComponent } from '../product-items/product-items.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { TypeListComponent } from './type-list/type-list.component';
import { ProductRequest, defaultProductRequest } from '../../shared/model/productreques.model';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SharedpaginationComponent } from '../../shared/component/sharedpagination/sharedpagination.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  searchTerm:string='';
  products:IProduct[];
  brandSelected:number;
  typeSelected:number;
  sortSelected:string;
  pageSizeSelected:number;
  pageIndexSelected:number;
  searchSelected:string;
  totalCount:number;
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}
  ];
  paginationOptions=[
    {name:'5',value:5},
    {name:'10',value:10},
    {name:'20',value:20},
    {name:'50',value:50}
  ];
  options:ProductRequest=defaultProductRequest;
  private hubConnectionBuilder!: HubConnection;
    offers: any[] = [];
constructor(private service:ProductService) { 
  this.getProducts();
}
ngOnInit() {
  
}

getProducts(){
  this.service.getProducts(this.options).subscribe(res=> {
    this.products = res.data;
    this.totalCount = res.count;
    this.pageIndexSelected = this.options.pageIndex;
    this.pageSizeSelected = this.options.pageSize;

  });

}
onBrandSelected(brand:number){
  this.brandSelected = brand;
  this.options.brand = brand;
  this.getProducts();

}
onTypeSelected(type:number){
  this.typeSelected = type;
  this.options.type = type;
  this.getProducts();
}
onSortSelected(sort:string){
  this.sortSelected = sort;
  this.options.sort = sort;
  this.getProducts();
}
onPageSizeSelected(pageSize:number){
  this.pageSizeSelected = pageSize;
  this.options.pageSize = pageSize;
  this.getProducts();
}
onSearch(){
  this.options.search = this.searchTerm;
  this.getProducts();
}
onResetClicked(){
  this.brandSelected = 0;
  this.typeSelected = 0;
  this.sortSelected = 'name';
  this.pageSizeSelected = 6;
  this.pageIndexSelected = 1;
  this.searchTerm='';
  this.options = defaultProductRequest;
  this.getProducts();

}
onPageChanged(event:any){
  if(this.options.pageIndex === event.page) return;
  this.options.pageIndex = event.page;
  this.getProducts();
}
}
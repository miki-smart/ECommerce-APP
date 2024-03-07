import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrand } from '../../../core/models/ibrand.model';
import { BrandService } from '../../../core/service/brand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit
{
  selectedBrand:number;
  @Output() onSelected=new EventEmitter<number>();
brands:IBrand[];
constructor(private service:BrandService) {
  this.brands = [{
    id:0,
    name:'All'
  }];
 }
ngOnInit() {
  this.service.getBrands().subscribe(res=> {
    this.brands.push(...res);
  });
}
onBrandSelected(brand:number){
  this.selectedBrand = brand;
  this.onSelected.emit(brand);
}
}

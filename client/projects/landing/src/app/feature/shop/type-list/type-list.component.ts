import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProductType } from '../../../core/models/iproducttype.model';
import { ProductTypeService } from '../../../core/service/producttype.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrl: './type-list.component.css'
})
export class TypeListComponent implements OnInit{
  selectedType:number;
@Output() onSelected=new EventEmitter<number>();
types:IProductType[];

constructor(private service:ProductTypeService) { 
  this.types = [{
    id:0,
    name:'All'
  }];
}
ngOnInit() {
  this.service.getProductTypes().subscribe(res=> {
    this.types.push(...res);
  });
}
onTypeSelected(type:number){
  this.selectedType = type;
  this.onSelected.emit(type);
}
}

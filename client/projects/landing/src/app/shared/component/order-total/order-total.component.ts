import { Component,OnInit } from '@angular/core';
import { BasketService } from '../../../core/service/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../../core/models/ibasket.model';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.css'
})
export class OrderTotalComponent implements OnInit{
  basketTotal$:Observable<IBasketTotals>;
  constructor(private basketService:BasketService) {
    console.log('OrderTotalComponent created');
  }
  ngOnInit(){
    this.basketTotal$=this.basketService.basketTotal$;
    console.log(this.basketTotal$);
  }
}


import { Component, OnInit } from '@angular/core';
import { IBasket } from '../../core/models/ibasket.model';
import { BasketService } from '../../core/service/basket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit{
basket$:Observable<IBasket>;
    constructor(private basketService:BasketService) {
      console.log('BasketComponent created');
    }
    ngOnInit(): void {
      
     this.basket$= this.basketService.basket$;
     this.basket$.subscribe((basket:IBasket)=>{console.log(basket);});
    }
    
    removeFromBasket(productId:number){
      this.basketService.removeFromBasket(productId);
    }
    incrementItemQuantity(item){
      this.basketService.incrementItemQuantity(item);
    }
    decrementItemQuantity(item){
      this.basketService.decrementItemQuantity(item);
    }
}

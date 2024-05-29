import { Component, OnInit } from '@angular/core';
import { BasketService } from './core/service/basket.service';
import { IBasket } from './core/models/ibasket.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
 constructor(private basketService:BasketService){

 }
  ngOnInit(){
    this.loadBasket();

  }
  private loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('initialized basket');
        },
        (error) => console.log(error),
      );
    }
    
  }
}

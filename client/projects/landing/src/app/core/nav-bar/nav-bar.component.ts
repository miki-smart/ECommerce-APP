import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BasketService } from '../service/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../models/ibasket.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
basket$:Observable<IBasket>;
   constructor(private basketService:BasketService) {}
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
}

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Basket, IBasket, IBasketItem, IBasketTotals } from "../models/ibasket.model";
import { BehaviorSubject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "../models/iproduct.model";
@Injectable({
  providedIn:'root'
})
export class BasketService {
  baseUrl=environment.apiUrl;
  private basketSource=new BehaviorSubject<IBasket>(null);
  basket$=this.basketSource.asObservable();
  private basketTotalSource=new BehaviorSubject<IBasketTotals>(null); 
  basketTotal$=this.basketTotalSource.asObservable();
  constructor(private http:HttpClient) {}

  getBasket(id:string){
    return this.http.get(this.baseUrl+'basket?id='+id).pipe(map((basket:IBasket)=>{
      this.basketSource.next(basket);
      this.calculateTotals();}));
  }
  setBasket(basket:IBasket){
    return this.http.post(this.baseUrl+'basket',basket).subscribe((response:IBasket)=>{
      this.basketSource.next(response);
      this.calculateTotals();
    },error=>{
      console.log(error);
    });
  }
  getCurrentBasketValue(){
    return this.basketSource.value;
  }
  addItemToBasket(item:IProduct,quantity=1){
    const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item,quantity);
    const basket=this.getCurrentBasketValue()??this.createBasket();
    basket.items=this.addOrUpdateItem(basket.items,itemToAdd,1);
    this.setBasket(basket);
  }
  mapProductItemToBasketItem(item: IProduct, quantity: number):IBasketItem {
    return  {
      id:item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType
    };
  }
  addOrUpdateItem(items:IBasketItem[], item: any, quantity: number): IBasketItem[] {
    console.log(items); 
    const index=items.findIndex(i=>i.id===item.id);
    if(index===-1){
      item.quantity=quantity;
      items.push(item);}else{
        items[index].quantity+=quantity;
      
      }
      return items;

  }
  createBasket(): IBasket {
    const basket= new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
    
  }
  removeFromBasket(itemId:number){
    const basket=this.getCurrentBasketValue();
    const itemIndex=basket.items.findIndex(i=>i.id===itemId);
    if(itemIndex!==-1){
      basket.items.splice(itemIndex,1);
      if(basket.items.length>0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }
  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }
  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeFromBasket(item.id);
    }
  }
  private calculateTotals(){
    const basket=this.getCurrentBasketValue();
    const shipping=0;
    const subtotal=basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total=subtotal+shipping;
    this.basketTotalSource.next({shipping,subtotal,total});
  }
}
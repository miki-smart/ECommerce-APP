import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProductType } from "../models/iproducttype.model";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: "root"
    })
export class ProductTypeService {
    apiUrl:string=environment.apiUrl;
    constructor(private http:HttpClient) {}
 public getProductTypes():Observable<IProductType[]> {
    
        return this.http.get<IProductType[]>(`${this.apiUrl}`+`Product/types`).pipe(map((result:any) => result));
    }
}
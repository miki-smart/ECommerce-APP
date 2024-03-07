import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IProduct } from "../models/iproduct.model";
import { ProductRequest } from "../../shared/model/productreques.model";
import { ApiResponse } from "../../shared/model/idataresponse.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
    })
export class ProductService {
    apiUrl:string=environment.apiUrl;
    constructor(private httpClient:HttpClient) { }
    public getProducts(options:ProductRequest):Observable<ApiResponse<IProduct>> {

        let params=new HttpParams();
        if(options.brand!=null&&options.brand!=0){
            params=params.append('brandId',options.brand.toString());

        }
        if(options.type!=null&&options.type!=0){
            params=params.append('typeId',options.type.toString());
        }
        if(options.sort!=null&&options.sort!=''){
            params=params.append('sort',options.sort);
        }
        if(options.pageSize!=null){
            params=params.append('pageSize',options.pageSize.toString());
        }
        if(options.pageIndex!=null){
            params=params.append('pageIndex',options.pageIndex.toString());
        }
        if(options.search!=null){
            params=params.append('search',options.search);
        }

        let url=this.apiUrl;
        url=url+'Product/products';
        return this.httpClient.get<ApiResponse<IProduct>>(`${url}`,{observe:"response",params}).pipe(map((result:any) => result.body));
 
        
    }
    public getProductById(id:number):Observable<ApiResponse<IProduct>> {
        return this.httpClient.get<IProduct>(`${this.apiUrl}/Product/products/${id}`).pipe(map((result:any) => result.body));
    }
}
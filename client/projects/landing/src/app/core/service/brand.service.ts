import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IBrand } from "../models/ibrand.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root"
    })
export class BrandService {
    apiUrl:string=environment.apiUrl;
    constructor(private http:HttpClient) {}
    public getBrands():Observable<IBrand[]>{
        return this.http.get<IBrand[]>(`${this.apiUrl}`+`Product/brands`).pipe(map((result:any) => result));
    }
}

export class ProductRequest{
    sort?:string;
    brand?:number;
    type?:number;
    pageSize?:number;
    pageIndex?:number;
    search?:string;

}
export const defaultProductRequest:ProductRequest={
    sort:"name",
    brand:null,
    type:null,
    pageSize:6,
    pageIndex:1,
    search:null
}


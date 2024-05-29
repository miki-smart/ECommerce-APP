import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, delay, finalize } from "rxjs";
import { BusyService } from "../service/busy.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    loadingService:BusyService;
    constructor(loadingService:BusyService) {
        this.loadingService = loadingService;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.busy();
        return next.handle(req).pipe(
            
            finalize(() => {
                this.loadingService.idle();
            })
        );
    }
}
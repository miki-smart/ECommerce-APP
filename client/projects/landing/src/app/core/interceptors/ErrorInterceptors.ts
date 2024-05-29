import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, delay, throwError } from "rxjs";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,private toaster:ToastrService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            delay(1000),catchError((err) => {
            if (err.status === 401) {
                this.toaster.error('Unauthorized');
                const navigationExtras:NavigationExtras = { state: { error: err.error } };
                this.router.navigateByUrl('/not-found');
            }
            if (err.status === 403) {
                this.toaster.error('Forbidden');
                const navigationExtras:NavigationExtras = { state: { error: err.error } };
                this.router.navigateByUrl('/not-found');
            }
            if (err.status === 404) {
               this.toaster.error('Not Found');
               const navigationExtras:NavigationExtras = { state: { error: err.error } };
                this.router.navigateByUrl('/not-found');
            }
            if (err.status === 500) {
                console.log(err);
                this.toaster.error('Internal Server Error');
                const navigationExtras:NavigationExtras = { state: { error: err.error } };
                this.router.navigateByUrl('/server-error',navigationExtras);
            }
            if(err.status===400){
                this.toaster.error('not found');
                const navigationExtras:NavigationExtras = { state: { error: {status:err.error._statusCode,message:err.error._message }} };
                this.router.navigateByUrl('/server-error',navigationExtras); 
            }
            return throwError(err);
        }));
    }
}
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';


import { Observable, of } from '../../../node_modules/rxjs';
import { catchError, tap } from '../../../node_modules/rxjs/operators';

import { Router } from '../../../node_modules/@angular/router';
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        if (localStorage.getItem('access-token') != null) {

            const token = localStorage.getItem('access-token');

            const customheaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json');

            const AuthRequest = request.clone({ headers: customheaders });
            return next.handle(AuthRequest).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                    }
                }),
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.router.navigate(['/welcome-dashboard/login']);                        
                    } else if (err instanceof HttpErrorResponse) {

                        console.log(err.error);
                    }
                    return of(err);
                }));
        } else {
            return next.handle(request).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                       
                    }
                }),
                catchError((err: any) => {
                    
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.router.navigate(['/welcome-dashboard/login']);
                       
                    } else if (err instanceof HttpErrorResponse) {
                        console.log(err.error);
                    }
                    return of(err);
                }));
        }
    }
}

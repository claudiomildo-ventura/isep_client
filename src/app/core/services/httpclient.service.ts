import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_VERSION, USE_AUTH, USE_REQUEST_ID, X_FUNCTION_KEY} from "../interceptor/http-context.tokens";

@Injectable({providedIn: 'root'})
export class HttpclientService {
    private readonly http: HttpClient = inject(HttpClient);

    public getMapping$<R>(url: string, options?: { context?: HttpContext }): Observable<R> {
        return this.http.get<R>(url, {
            context: options?.context ?? new HttpContext()
                .set(USE_AUTH, true)
                .set(API_VERSION, "v.1")
        });
    }

    public postMapping$<R>(url: string, body: unknown, options?: { context?: HttpContext }): Observable<R> {
        return this.http.post<R>(url, body, {
            context: options?.context ?? new HttpContext()
                .set(USE_AUTH, true)
                .set(API_VERSION, "v.1")
                .set(USE_REQUEST_ID, true)
                .set(X_FUNCTION_KEY, "11111111111111111")
        });
    }
}
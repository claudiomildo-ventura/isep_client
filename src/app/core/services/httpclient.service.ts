import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_VERSION, CONTENT_LANGUAGE, USE_AUTH} from "../interceptor/http-context.tokens";

@Injectable({providedIn: 'root'})
export class HttpclientService {

    private readonly http: HttpClient = inject(HttpClient);

    public getData$<R>(url: string, options?: { context?: HttpContext }): Observable<R> {
        return this.http.get<R>(url, {
            context: options?.context ?? new HttpContext()
                .set(USE_AUTH, true)
                .set(API_VERSION, "v1")
        });
    }

    public postData$<R>(url: string, body: unknown, options?: { context?: HttpContext }): Observable<R> {
        return this.http.post<R>(url, body, {
            context: options?.context ?? new HttpContext()
                .set(USE_AUTH, true)
                .set(API_VERSION, "v1")
                .set(CONTENT_LANGUAGE, "en")
        });
    }
}
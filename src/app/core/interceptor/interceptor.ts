import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {API_VERSION, CONTENT_LANGUAGE, USE_AUTH} from "./http-context.tokens";

@Injectable()
export class Interceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const useAuth: boolean = req.context.get(USE_AUTH);
        const apiVersion: string = req.context.get(API_VERSION);
        const contentLanguage: string = req.context.get(CONTENT_LANGUAGE);

        let headers: HttpHeaders = req.headers;

        if (apiVersion) {
            headers = headers.set('X-Api-Version', apiVersion);
        }

        if (contentLanguage) {
            headers = headers.set('Content-Language', contentLanguage);
        }

        headers = headers.set('X-Request-Id', crypto.randomUUID());

        if (useAuth) {
            const token = this.getToken();
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
        }

        const isBodyRequest = ['POST', 'PUT', 'PATCH'].includes(req.method);
        if (isBodyRequest && !headers.has('Content-Type')) {
            headers = headers.set('Content-Type', 'application/json');
        }

        return next.handle(req.clone({ headers }));
    }

    private getToken(): string | null {
        return "gavw478234278923fhehfhf"; // create a function to get it from localstorage.
    }
}
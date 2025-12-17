import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {API_VERSION, USE_AUTH, USE_REQUEST_ID, X_FUNCTION_KEY} from "./http-context.tokens";

@Injectable()
export class Interceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const useAuth: boolean = req.context.get(USE_AUTH);
        const apiVersion: string = req.context.get(API_VERSION);
        const useRequestId: boolean = req.context.get(USE_REQUEST_ID);
        const functionKey: string = req.context.get(X_FUNCTION_KEY);

        let headers: HttpHeaders = req.headers;

        if (useAuth) {
            const token: string | null = this.getToken();
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
        }

        headers = headers.set('x-api-version', apiVersion);

        if (req.method === 'GET') {
            // logic for GET requests
        }

        if (req.method === 'POST') {
            if (useRequestId) {
                headers = headers.set('x-request-id', crypto.randomUUID().replace(/-/g, ''));
            }

            headers = headers.set('x-function-key', functionKey);
        }

        return next.handle(req.clone({headers}));
    }

    private getToken(): string | null {
         // create a function to get it from localstorage.
        return "1234567890abcdefgh";
    }
}
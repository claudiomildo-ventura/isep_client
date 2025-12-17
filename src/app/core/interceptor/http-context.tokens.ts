import {HttpContextToken} from '@angular/common/http';

export const USE_AUTH = new HttpContextToken<boolean>((): true => true);
export const API_VERSION = new HttpContextToken<string>((): string => '1.0');
export const USE_REQUEST_ID = new HttpContextToken<boolean>((): true => true);
export const X_FUNCTION_KEY = new HttpContextToken<string>((): string => 'x-function-key');
export const TOKEN = new HttpContextToken<string | null>((): null => null);
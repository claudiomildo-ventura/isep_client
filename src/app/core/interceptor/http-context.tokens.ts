import {HttpContextToken} from '@angular/common/http';

export const USE_AUTH = new HttpContextToken<boolean>((): true => true);
export const API_VERSION = new HttpContextToken<string>((): string => '1.0');
export const CONTENT_LANGUAGE = new HttpContextToken<string>((): string => 'en');
export const TOKEN = new HttpContextToken<string | null>((): null => null);
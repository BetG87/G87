import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SessionStorageService } from '../StorageService/session-storage.service';
//import { SessionStorageService } from '../StorageService/session-storage.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': 'http://g87.bet',
    'Access-Control-Allow-Origin': 'http://localhost:8000/',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    // 'Authorization': 'my-auth-token',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type,Origin, Authorization, Accept,Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ConnectApiService {
 // private REST_API_SERVER = 'http://g87.bet'
  private REST_API_SERVER = 'http://localhost:8000'
  // private REST_API_SERVER = 'http://localhost'
  constructor(private http: HttpClient) {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        // `Backend returned code ${error.status}, `
        // +
        // `body was: ${error.error  }`
        error
      );
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'

    );
  };
  public get(url: string) {
    const urlall = `${this.REST_API_SERVER}/` + url
    return this.http.get(urlall)
      .pipe(
        catchError(this.handleError)
      );
  }
  public post(url: string, data: any) {
    const urlall = `${this.REST_API_SERVER}/` + url

    return this.http.post<any>(urlall, data)
      .pipe(
        catchError(this.handleError)
      );
  }
}


const TOKEN_KEY_HEADER = 'Authorization'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: SessionStorageService)
  {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_KEY_HEADER, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders =
  [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ]

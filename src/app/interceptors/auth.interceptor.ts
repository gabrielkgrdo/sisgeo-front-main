import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private AutenticacaoService: AutenticacaoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');

    if(token) {
      const cloneRequisicao = 
        request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(cloneRequisicao);
    }else{
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]

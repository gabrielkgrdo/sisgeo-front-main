import { Injectable } from '@angular/core';
import { Credenciais } from '../modelos/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private redirectUrl: string | null = null;
  private currentUserEmail: string | null = null;

  jtwService: JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient, private router: Router) { }

  autenticacao(credenciais: Credenciais) {

    return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
      observe: 'response',
      responseType: 'text',
    });
  }

  getNomeUsuario(): string {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jtwService.decodeToken(token);
      return decodedToken.nome; // Altere para corresponder à chave do nome no payload do seu token
    }

    return ''; // Retorne um valor padrão caso o token não esteja presente
  }

  loginSucesso(token: string) {
    localStorage.setItem('token', token);
    // console.log('Token armazenado no localStorage:', token);
  }

  estaAutenticado() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jtwService.isTokenExpired(token);
    }
    return false;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (token) {
      return this.jtwService.isTokenExpired(token); 
    }

    return true; // O token expirou ou não existe
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isUserAdmin(): boolean {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jtwService.decodeToken(token);
      const roles = decodedToken.roles; // Suponha que as roles estejam armazenadas na propriedade 'roles' do token

      if (Array.isArray(roles)) {
        return roles.some(role => role.authority === 'ROLE_ADMIN');
      }
    }

    return false;
  }

  setLoggedInUserEmail(email: string): void {
    localStorage.setItem('loggedInUserEmail', email);
  }

  getLoggedInUserEmail(): string | null {
    return localStorage.getItem('loggedInUserEmail');
  }
  
  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }

  setCurrentUserEmail(email: string | null): void {
    this.currentUserEmail = email;
  }
  

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
    console.log('URL de redirecionamento definida:', url); // Adicione este console.log
  }

  getRedirectUrl(): string {
    console.log('Obtendo URL de redirecionamento:', this.redirectUrl); // Adicione este console.log
    return this.redirectUrl;
  }

  logout(){
    localStorage.clear();
  }
}

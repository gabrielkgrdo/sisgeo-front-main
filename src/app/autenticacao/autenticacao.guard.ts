import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})

  
export class AutenticacaoGuard implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.autenticacaoService.isTokenExpired()) {
        // Armazena a URL antes do redirecionamento para o login
        this.autenticacaoService.setRedirectUrl(state.url);
        // Token expirado, redirecione para a página de login
        this.router.navigate(['login']);
        return false;
      }
      if (this.autenticacaoService.estaAutenticado()) {
        return true; // O usuário está autenticado, permita o acesso à rota
      }

      // Caso contrário, redirecione para a página de login
      this.autenticacaoService.setRedirectUrl(state.url); // Armazena a URL de redirecionamento
      this.router.navigate(['login']);
      return false;
    
  }
  
}

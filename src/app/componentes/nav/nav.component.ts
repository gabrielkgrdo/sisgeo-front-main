import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { SessaoUsuarioService } from 'src/app/services/sessao-usuario.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUserEmail: string | null;

  constructor(
    private router: Router,
    public autenticacaoServico: AutenticacaoService,
    private alertLogout: ToastrService,
    private sessaoUsuarioService: SessaoUsuarioService
    ) { 
      this.currentUserEmail = autenticacaoServico.getLoggedInUserEmail();
    }

    ngOnInit(): void {
      this.checkExpiredToken(); // Verifica se o token expirou ao inicializar o componente
      this.currentUserEmail = this.autenticacaoServico.getLoggedInUserEmail(); // Atualiza o email do usuário atual
    }
  
    checkExpiredToken(): void {
      if (this.autenticacaoServico.isTokenExpired()) {
        console.log('Token expirado. Redirecionando para login...');
        this.clearRedirectUrlAndNavigateHome();
        this.router.navigate(['login']);
        this.alertLogout.info('Tempo de sessão expirada, por favor autentique-se novamente!', 'Sessão expirada', { timeOut: 7000 });
      } else {
        const currentUserEmail = this.autenticacaoServico.getLoggedInUserEmail();
        if (currentUserEmail !== this.currentUserEmail) {
          console.log('Email atual diferente do armazenado. Redirecionando para home...');
          // Se o email atual for diferente do armazenado, redirecione para a página inicial (home)
          this.clearRedirectUrlAndNavigateHome();
          this.router.navigate(['home']);
        }
        this.currentUserEmail = currentUserEmail;
      }
    }
    
    
    
    clearRedirectUrlAndNavigateHome(): void {
      this.autenticacaoServico.clearRedirectUrl(); // Limpa a URL de redirecionamento
      this.router.navigate(['home']); // Redireciona para a página inicial
    }
    
    
    
  
    navigateTo(route: string): void {
      this.autenticacaoServico.setRedirectUrl('/'+ route);
      this.router.navigate([route]);
    }

    navigateToAndCheckToken(route: string): void {
      this.navigateTo(route); // Chama o método para navegar para a rota desejada
      this.checkExpiredToken(); // Chama o método para verificar o token expirado
    }

  logout() {
    // Limpa a URL de redirecionamento
    this.autenticacaoServico.clearRedirectUrl();
    this.router.navigate(['login'])
    // Limpa o email do usuário atual
    this.autenticacaoServico.setCurrentUserEmail(null);
    this.autenticacaoServico.logout();
    this.alertLogout.info('Logout realizado com sucesso!', 'Logout', {timeOut: 7000})
  }

}

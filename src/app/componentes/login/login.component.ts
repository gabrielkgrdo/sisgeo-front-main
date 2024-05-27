import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/modelos/credenciais';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credenciais: Credenciais = {
    email: '',
    senha: '',
  }

  email = new FormControl(null, Validators.email)
  senha = new FormControl(null, Validators.minLength(3))

  constructor(
    private alert: ToastrService,
    private service: AutenticacaoService,
    private router: Router
    ) { }

  ngOnInit(): void { }

  logar() {
    console.log('Iniciando o processo de login...');
    
    // Obtém a URL desejada para redirecionamento
    const redirectUrl = this.service.getRedirectUrl();
  
    // Limpa a URL de redirecionamento antes de fazer o login
    this.service.clearRedirectUrl();
  
    this.service.autenticacao(this.credenciais).subscribe(
      (resposta) => {
        console.log('Solicitação de autenticação bem-sucedida:', resposta);
  
        const authorizationHeader = resposta.headers.get('Authorization');
        if (authorizationHeader) {
          const token = authorizationHeader.substring(7);
          this.service.loginSucesso(token);
          console.log('Token armazenado no localStorage:', token);
  
          // Decodifique o token
          const decodedToken = this.service.jtwService.decodeToken(token);
  
          // Verifique se o token possui uma propriedade 'sub' (email do usuário)
          if (decodedToken && decodedToken.sub) {
            // Define o email do usuário atual
            this.service.setCurrentUserEmail(decodedToken.sub);
          } else {
            console.error('Token não possui uma propriedade "sub".');
          }
  
          if (redirectUrl) {
            console.log('Redirecionando o usuário para a URL de redirecionamento:', redirectUrl);
            // Redireciona o usuário para a URL de redirecionamento
            this.router.navigateByUrl(redirectUrl);
          } else {
            console.log('Nenhuma URL de redirecionamento encontrada, indo para a página "home".');
            // Caso não haja URL de redirecionamento, vá para a página 'home'
            this.router.navigateByUrl('/home');
          }
  
          console.log('Token de autorização obtido e armazenado com sucesso:', token);
        } else {
          this.alert.error('O servidor não retornou um token de autorização.');
        }
      },
      (error) => {
        console.error('Erro ao fazer a solicitação de autenticação:', error);
        this.alert.error('Usuário e/ou senha inválidos');
      }
    );
  }
  
  
    registro(): void {
    this.router.navigate(['/registro']);
  }
  
  

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoUsuarioService {

  private usuarioAtualEmail: string | null = null;

  setUsuarioAtual(email: string): void {
    this.usuarioAtualEmail = email;
  }

  getUsuarioAtual(): string | null {
    return this.usuarioAtualEmail;
  }

  limparSessao(): void {
    this.usuarioAtualEmail = null;
  }
}
